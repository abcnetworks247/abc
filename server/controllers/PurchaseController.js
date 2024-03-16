const { StatusCodes } = require('http-status-codes');
const Product = require('../models/productsSchema');
const coinbase = require('coinbase-commerce-node');
const PurchaseHistoryModel = require('../models/purchaseSchema');
const OrderHistoryModel = require('../models/orderHistorySchema');
const PurchaseHistoryJoi = require('../Utils/PurchaseHistoryJoi');
const OrderHistoryJoi = require('../Utils/OrderHistoryJoi');
const sendMail = require('../Utils/sendMail');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

var Webhook = coinbase.Webhook;
const dotenv = require('dotenv').config();

const Client = require('../models/clientAuthSchema');
const coinbaseClient = coinbase.Client;
const resources = coinbase.resources;

const adminUrl = process.env.ADMIN_URL;
const serverUrl = process.env.SERVER_URL;
const clientUrl = process.env.CLIENT_URL;

const stripe = require('stripe')(process.env.STRIPE_SECRETE_KEY);
const stripeWebhookPurchaseSecret = process.env.STRIPE_PRODUCT_WEBHOOK_SECRETE;
// const clientObj = Client.init(process.env.COINBASE_API_KEY);
// clientObj.setRequestTimeout(3000);
const localurl = process.env.CLIENT_URL;

const StripeCheckout = async (req, res) => {
  const {
    product,
    phone,
    shippingAddress,
    postalcode,
    city,
    state,
    country,
    note,
  } = req.body;

  const user = req.user;
  let customer;

  try {
    if (!user) {
      throw new UnAuthorizedError(
        'User must be logged in to purchase a product'
      );
    }

    await Client.findByIdAndUpdate(
      String(user._id),
      {
        phone: phone,
      },
      { new: true }
    );

    const existingCustomer = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });

    if (existingCustomer.data.length > 0) {
      // Customer already exists
      customer = existingCustomer.data[0];

      // Check if the customer already has an active subscription
    } else {
      // No customer found, create a new one

      customer = await stripe.customers.create({
        email: user.email,
        name: user.fullname,
        phone: Number(phone),
        address: {
          line1: shippingAddress,
          line2: Number(phone),
          city: city,
          postal_code: postalcode,
          state: state,
          country: country,
        },
        metadata: {
          userId: user._id,
        },
      });
    }

    const lineItems = product.map((product) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.product.title,
          images: [product.product.thumbnail],
        },
        unit_amount: product.product.price * 100,
      },
      quantity: product.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      customer: customer.id,
      mode: 'payment',
      // cart: JSON.stringify(lineItems),
      success_url: `${localurl}/paymentsuccess?success=true`,
      cancel_url: `${localurl}/paymenterror?canceled=true`,
      metadata: {
        // Include product information in metadata
        description: note,
      },
    });

    res.status(StatusCodes.OK).send({ url: session.url });
  } catch (error) {
    console.error('Error in StripeCheckout:', error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: 'Internal server error' });
  }
};

const stripeProductWebhook = async (req, res) => {
  console.log('stripe webhook for product');

  const templatePath = path.join(__dirname, '../views/purchaseView.ejs');
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      stripeWebhookPurchaseSecret
    );
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  console.log('new');
  // Handle the event
  switch (event.type) {
    case 'checkout.session.async_payment_failed':
      const checkoutSessionAsyncPaymentFailed = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_failed
      console.log('payment failed', checkoutSessionAsyncPaymentFailed);
      break;
    case 'checkout.session.async_payment_succeeded':
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_succeeded
      console.log('Checkout successful', checkoutSessionAsyncPaymentSucceeded);
      break;

    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;
      // Then define and call a function to handle the event checkout.session.async_payment_succeeded

      let email = checkoutSessionCompleted.customer_details.email;

      const olduser = await Client.findOne({ email });

      const donationTime = new Date(); // Instantiate a new Date object for current time
      const hours = donationTime.getHours();
      const minutes = donationTime.getMinutes();
      const seconds = donationTime.getSeconds();

      // Format the time
      const formattedTime = `${hours}:${minutes}:${seconds}`;

      const currentDate = new Date(); // Instantiate a new Date object for current date
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
      const day = String(currentDate.getDate()).padStart(2, '0');

      // Format the date
      const formattedDate = `${year}-${month}-${day}`;

      let cartdesc = checkoutSessionCompleted.metadata.description;

      // Assuming your cart contains product IDs

      const productIds = olduser.cart.map((item) => item.product);

      // Retrieve the full product details from MongoDB using product IDs
      const products = await Product.find({ _id: { $in: productIds } });

      // Map each item in the cart to its corresponding product information
      const combinedCart = olduser.cart.map((item) => {
        // Find the product object in the products array that matches the current item's product ID
        const productInfo = products.find(
          (product) => product._id.toString() === item.product.toString()
        );

        // Return an object containing product information, quantity, and other properties from the original cart item
        return {
          product: productInfo,
          quantity: item.quantity,
          _id: item._id,
        };
      });

      console.log(combinedCart);

      const data = {
        email: olduser.email,
        name: olduser.fullname,
        amount: checkoutSessionCompleted.amount_total / 100,
        currency: checkoutSessionCompleted.currency,
        payment_Date: formattedDate, // Current date
        payment_Time: formattedTime, // Current time
        cart: combinedCart,
        note: cartdesc,
        payment_status: checkoutSessionCompleted.payment_status,
        payment_method_types: checkoutSessionCompleted.payment_method_types[0],
        transaction_Id: checkoutSessionCompleted.id,
        phone: olduser.phone,
        address: checkoutSessionCompleted.customer_details.address.line1,
        city: checkoutSessionCompleted.customer_details.address.city,
        postal_code:
          checkoutSessionCompleted.customer_details.address.postal_code,
        state: checkoutSessionCompleted.customer_details.address.state,
        country: checkoutSessionCompleted.customer_details.address.country,
      };

      const data2 = {
        email: olduser.email,
        name: olduser.fullname,
        amount: checkoutSessionCompleted.amount_total / 100,
        currency: checkoutSessionCompleted.currency,
        payment_Date: formattedDate, // Current date
        payment_Time: formattedTime, // Current time
        cart: combinedCart,
        note: cartdesc,
        delivery_Status: 'pending',
        payment_status: checkoutSessionCompleted.payment_status,
        payment_method_types: checkoutSessionCompleted.payment_method_types[0],
        transaction_Id: checkoutSessionCompleted.id,
        phone: olduser.phone,
        address: checkoutSessionCompleted.customer_details.address.line1,
        city: checkoutSessionCompleted.customer_details.address.city,
        postal_code:
          checkoutSessionCompleted.customer_details.address.postal_code,
        state: checkoutSessionCompleted.customer_details.address.state,
        country: checkoutSessionCompleted.customer_details.address.country,
      };

      // const { error, value } = PurchaseHistoryJoi.validate(data);
      // const { error1, value1 } = OrderHistoryJoi.validate(data2);

      // if (error) {
      //   throw new ValidationError("Data recieved is invalid");
      // }

      // if (error1) {
      //   throw new ValidationError("Data recieved is invalid");
      // }

      const newData = await PurchaseHistoryModel.create(data);
      const newData1 = await OrderHistoryModel.create(data2);

      await Client.findByIdAndUpdate(olduser._id, {
        $push: {
          productpurchasehistory: newData._id,
          orderhistory: newData1._id,
        },
        $set: {
          cart: [],
        },
      });

      const renderHtml = await ejs.renderFile(
        templatePath,
        {
          userFullname: olduser.fullname,
          userEmail: olduser.email,
          // donation_data: data,
        },
        { async: true }
      );

      await sendMail({
        email: olduser.email,
        subject: 'Thank you for your order',
        html: renderHtml,
      });

      console.log('sent email product successfully');

      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.status(200).end();
};

// const Crypto = async (req, res) => {
//   const { product } = req.body;

//   const user = req.user;

//   try {
//     if (!user) {
//       throw new UnAuthorizedError(
//         "User must be logged in to purchase a product"
//       );
//     }

//     const lineItems = product.map((product) => ({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: product.product.title,
//           images: [product.product.thumbnail],
//         },
//         unit_amount: product.product.price * 100,
//       },
//       quantity: product.quantity,
//     }));

//     const chargeData = {
//       name: product.name,
//       description: product.description,
//       pricing_type: "fixed_price",
//       local_price: {
//         amount: product.price,
//         currency: product.currency,
//       },
//       metadata: {
//         product_id: product.id,
//         user_id: user.email,
//       },
//     };

//     const charge = await resources.Charge.create(chargeData);

//     res.status(StatusCodes.OK).json({ data: charge });
//   } catch (e) {
//     res.status(500).send({ error: e });
//   }
// };

// const CryptoWebhook = async (req, res) => {
//   try {
//     const event = Webhook.verifySigHeader(
//       req.rawBody,
//       req.headers["x-cc-webhook-signature"],
//       process.env.COINBASE_API_KEY
//     );

//     console.log("Successfully verified", event);

//     if (event.type === "charge:confirmed") {
//       let amount = event.data.pricing.local.amount;
//       let currency = event.data.pricing.local.amount;
//       let userId = event.data.metadata.user_id;
//     }
//   } catch (error) {
//     console.log("Failed");
//     console.log(error);
//   }
// };

const Crypto = (req, res) => {};

const CryptoWebhook = (req, res) => {};

module.exports = {
  StripeCheckout,
  stripeProductWebhook,
  Crypto,
  CryptoWebhook,
};
