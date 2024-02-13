const { StatusCodes } = require("http-status-codes");
const Product = require("../models/productsSchema");
const coinbase = require("coinbase-commerce-node");
var Webhook = coinbase.Webhook;
const dotenv = require("dotenv").config();

const Client = coinbase.Client;
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



    const session = await stripe.checkout.sessions.create({
      line_items: [{
        price_data: {
          currency: "usd",
          product_data: {
            name: data.name,
          },
          unit_amount: data.amount * 100,
        },
        quantity: 1,
      },],

      customer_email: user.email,
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
  const payload = req.body;

  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "checkout.session.completed") {
    console.log(event);
    const sessionDetails = await stripe.checkout.sessions.retrieve(
      event.data.object.id,
      {
        expand: ["line_items", "customer"],
      }
    );
    const lineItems = sessionDetails.line_items;
    console.log("Paid for items :- \n", lineItems.data);

    const customerDetails = sessionDetails.customer_details;

    if (event.data.object.payment_status === "paid") {
      console.log("Payment Success for customer:-", customerDetails.email);
      // Store payment data and mark payment as complete in DB
    }
    // Delayed payment scenarios https://stripe.com/docs/payments/checkout/fulfill-orders#delayed-notification
  }
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
  getSingleDonation,
  getAllDonation,
  StripeCheckout,
  stripeProductWebhook,
  Crypto,
  CryptoWebhook,
};
