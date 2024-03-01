const { StatusCodes } = require('http-status-codes');
const Product = require('../models/productsSchema');
const coinbase = require('coinbase-commerce-node');
const Client = require('../models/clientAuthSchema');
const DonateModel = require('../models/donationSchema');
const DonationJoi = require('../Utils/DonationJoiSchema');
const sendMail = require('../Utils/sendMail');
const path = require('path');
const rawBody = require('raw-body');
var Webhook = coinbase.Webhook;
const dotenv = require('dotenv').config();

const fs = require('fs');
const ejs = require('ejs');
const CoinbaseClient = coinbase.Client;
const resources = coinbase.resources;
const adminUrl = process.env.ADMIN_URL;
const serverUrl = process.env.SERVER_URL;
const clientUrl = process.env.CLIENT_URL;

const stripe = require('stripe')(process.env.STRIPE_SECRETE_KEY);

// const clientObj = Client.init(process.env.COINBASE_API_KEY);
// clientObj.setRequestTimeout(3000);

const ProductJoi = require('../Utils/ProductJoiSchema');
const {
  NotFoundError,
  UnAuthorizedError,
  ValidationError,
} = require('../errors/index');
const { log } = require('console');

const localurl = process.env.CLIENT_URL;
const stripeWebhookSecret = process.env.STRIPE_DONATION_WEBHOOK_SECRETE;

// Controller for fetching a list of products (accessible to all users)
const getAllDonation = async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};

//getting sinlge products based on the user parameters
const getSingleDonation = async (req, res) => {
  try {
    const productId = req.params.id;

    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: 'Product not found' });
    }

    res.status(StatusCodes.OK).json(product);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: 'Internal Server Error' });
  }
};

const StripeCheckout = async (req, res) => {
  const data = req.body;

  const user = req.user;
  let customer;

  try {
    if (!user) {
      throw new UnAuthorizedError(
        'User must be logged in to purchase a product'
      );
    }

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
        metadata: {
          userId: user._id, // Replace with actual Auth0 user ID
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: data.name,
            },
            unit_amount: data.amount * 100,
          },
          quantity: 1,
        },
      ],

      metadata: {
        userId: user._id,
      },
      customer: customer.id,
      mode: 'payment',
      success_url: `${localurl}/paymentsuccess?success=true`,
      cancel_url: `${localurl}/paymenterror?canceled=true`,
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
  console.log('Stripe donate Webhook');

  const sig = req.headers['stripe-signature'];
  const templatePath = path.join(__dirname, '../views/donationView.ejs');

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, stripeWebhookSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.async_payment_failed':
      const checkoutSessionAsyncPaymentFailed = event.data.object;

      break;

    case 'checkout.session.completed':
      const checkoutSessionCompleted = event.data.object;

      let email = checkoutSessionCompleted.customer_details.email;

      try {
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

        const data = {
          email: olduser.email,
          name: olduser.fullname,
          amount: checkoutSessionCompleted.amount_total / 100,
          currency: checkoutSessionCompleted.currency,
          donation_Date: formattedDate, // Current date
          donation_Time: formattedTime, // Current time
          payment_status: checkoutSessionCompleted.payment_status,
          payment_method_types:
            checkoutSessionCompleted.payment_method_types[0],
          transaction_Id: checkoutSessionCompleted.id,
        };

        const { error, value } = DonationJoi.validate(data);

        if (error) {
          throw new ValidationError('Data recieved is invalid');
        }

        const newData = await DonateModel.create(value);

        olduser.donationhistory.unshift(newData._id);

        await olduser.save();

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
          subject: 'Thank you for your donation',
          html: renderHtml,
        });

        console.log("sent successfully");

        //new data added to the controller
      } catch (error) {
        console.log('error', error);
      }

      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send().end();
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
  getSingleDonation,
  getAllDonation,
  StripeCheckout,
  stripeProductWebhook,
  Crypto,
  CryptoWebhook,
};
