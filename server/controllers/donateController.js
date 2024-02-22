const { StatusCodes } = require("http-status-codes");
const Product = require("../models/productsSchema");
const coinbase = require("coinbase-commerce-node");
const Client = require("../models/clientAuthSchema");
const DonateModel = require("../models/donationSchema");
const DonationJoi = require("../Utils/DonationJoiSchema");
const rawBody = require("raw-body");
var Webhook = coinbase.Webhook;
const dotenv = require("dotenv").config();

const CoinbaseClient = coinbase.Client;
const resources = coinbase.resources;

const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);

// const clientObj = Client.init(process.env.COINBASE_API_KEY);
// clientObj.setRequestTimeout(3000);

const ProductJoi = require("../Utils/ProductJoiSchema");
const {
  NotFoundError,
  UnAuthorizedError,
  ValidationError,
} = require("../errors/index");

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
      .json({ error: "Internal Server Error" });
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
        .json({ error: "Product not found" });
    }

    res.status(StatusCodes.OK).json(product);
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: "Internal Server Error" });
  }
};

const StripeCheckout = async (req, res) => {
  const data = req.body;

  const user = req.user;

  try {
    if (!user) {
      throw new UnAuthorizedError(
        "User must be logged in to purchase a product"
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
            currency: "usd",
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
      customer: user._id,
      mode: "payment",
      success_url: `${localurl}/paymentsuccess?success=true`,
      cancel_url: `${localurl}/paymenterror?canceled=true`,
    });

    res.status(StatusCodes.OK).send({ url: session.url });
  } catch (error) {
    console.error("Error in StripeCheckout:", error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ error: "Internal server error" });
  }
};

const stripeProductWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, stripeWebhookSecret);
  } catch (err) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Check if the event type is "charge.succeeded" or "checkout.session.completed"

  // Handle the event
  switch (event.type) {
    case "checkout.session.async_payment_failed":
      const checkoutSessionAsyncPaymentFailed = event.data.object;

      console.log(
        "checkout.session.async_payment_failed",
        checkoutSessionAsyncPaymentFailed
      );
      // Then define and call a function to handle the event checkout.session.async_payment_failed

      let userEmail2 = checkoutSessionCompleted.customer_details.email;
      const olduser2 = await Client.findOne({ userEmail2 });

      const donationTime2 = new Date(); // Instantiate a new Date object for current time
      const hours2 = donationTime.getHours();
      const minutes2 = donationTime.getMinutes();
      const seconds2 = donationTime.getSeconds();

      // Format the time
      const formattedTime2 = `${hours}:${minutes}:${seconds}`;

      const currentDate2 = new Date(); // Instantiate a new Date object for current date
      const year2 = currentDate2.getFullYear();
      const month2 = String(currentDate2.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day2 = String(currentDate2.getDate()).padStart(2, "0");

      // Format the date
      const formattedDate2 = `${year2}-${month2}-${day2}`;

      const data2 = {
        email: olduser2.email,
        name: olduser2.fullname,
        amount: checkoutSessionAsyncPaymentFailed.amount_total / 100,
        currency: checkoutSessionAsyncPaymentFailed.currency,
        donation_Date: formattedDate2, // Current date
        donation_Time: formattedTime2, // Current time
        payment_status: checkoutSessionAsyncPaymentFailed.status,
        payment_method_types:
          checkoutSessionAsyncPaymentFailed.payment_method_details.type,
        hosted_invoice_url: checkoutSessionAsyncPaymentFailed.receipt_url,
        transaction_Id: checkoutSessionAsyncPaymentFailed.id,
      };

      const { error2, value2 } = DonationJoi.validate(data2);

      if (error2) {
        throw new ValidationError("Data recieved is invalid");
      }

      const newData2 = await DonateModel.create(value2);

      olduser2.donationhistory.unshift(newData2.id);

      await olduser.save();

      break;

    case "charge.succeeded":
      const checkoutSessionAsyncPaymentSucceeded = event.data.object;

      // Then define and call a function to handle the event checkout.session.async_payment_succeeded

      let userEmail =
        checkoutSessionAsyncPaymentSucceeded.billing_details.email;
      const olduser = await Client.findOne({ userEmail });

      const donationTime = new Date(); // Instantiate a new Date object for current time
      const hours = donationTime.getHours();
      const minutes = donationTime.getMinutes();
      const seconds = donationTime.getSeconds();

      // Format the time
      const formattedTime = `${hours}:${minutes}:${seconds}`;

      const currentDate = new Date(); // Instantiate a new Date object for current date
      const year = currentDate.getFullYear();
      const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      const day = String(currentDate.getDate()).padStart(2, "0");

      // Format the date
      const formattedDate = `${year}-${month}-${day}`;

      const data = {
        email: olduser.email,
        name: olduser.fullname,
        amount: checkoutSessionAsyncPaymentSucceeded.amount / 100,
        currency: checkoutSessionAsyncPaymentSucceeded.currency,
        donation_Date: formattedDate, // Current date
        donation_Time: formattedTime, // Current time
        payment_status: checkoutSessionAsyncPaymentSucceeded.status,
        payment_method_types:
          checkoutSessionAsyncPaymentSucceeded.payment_method_details.type,
        hosted_invoice_url: checkoutSessionAsyncPaymentSucceeded.receipt_url,
        transaction_Id: checkoutSessionAsyncPaymentSucceeded.id,
      };

      const { error, value } = DonationJoi.validate(data);

      if (error) {
        throw new ValidationError("Data recieved is invalid");
      }

      const newData = await DonateModel.create(value);

      olduser.donationhistory.unshift(newData.id);

      await olduser.save();

      break;

    case "checkout.session.completed":
      // const checkoutSessionCompleted = event.data.object;

      // let userEmail = checkoutSessionCompleted.customer_details.email;
      // const olduser = await Client.findOne({ userEmail });

      // const donationTime = new Date(); // Instantiate a new Date object for current time
      // const hours = donationTime.getHours();
      // const minutes = donationTime.getMinutes();
      // const seconds = donationTime.getSeconds();

      // // Format the time
      // const formattedTime = `${hours}:${minutes}:${seconds}`;

      // const currentDate = new Date(); // Instantiate a new Date object for current date
      // const year = currentDate.getFullYear();
      // const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Months are zero-based
      // const day = String(currentDate.getDate()).padStart(2, "0");

      // // Format the date
      // const formattedDate = `${year}-${month}-${day}`;

      // const data = {
      //   email: olduser.email,
      //   name: olduser.fullname,
      //   amount: checkoutSessionCompleted.amount_total / 100,
      //   currency: checkoutSessionCompleted.currency,
      //   donation_Date: formattedDate, // Current date
      //   donation_Time: formattedTime, // Current time
      //   payment_status: checkoutSessionCompleted.payment_status,
      //   payment_method_types: checkoutSessionCompleted.payment_method_types[0],
      //   hosted_invoice_url: checkoutSessionCompleted.hosted_invoice_url,
      //   transaction_Id: checkoutSessionCompleted.id,
      // };

      // console.log("checkoutSessionCompleted", checkoutSessionCompleted);
      // console.log("data received", data);

      // const { error, value } = DonationJoi.validate(data);

      // if (error) {
      //   throw new ValidationError("Data recieved is invalid");
      // }

      // const newData = await DonateModel.create(value);

      // olduser.donationhistory.unshift(newData.id);

      // await olduser.save();

      // console.log("data" + newData);
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
