const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");
const { MongoClient, ServerApiVersion } = require("mongodb");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const uri = process.env.MONGO_URI;
const endpointSecret = process.env.WEBHOOK_SIGNING_SECRET;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// Connect to the client
client.connect();

const app = express();
app.use(cors());

app.use(bodyParser.raw({ type: "application/json" }));

// Route to create intent
// =====================================================================================
// =====================================================================================
// =====================================================================================

app.post("/create-stripe-session-subscription", async (req, res) => {
  const userEmail = "rishi123@tricksumo.com"; // Replace with actual user email
  let customer;
  const auth0UserId = userEmail;

  // Try to retrieve an existing customer by email
  const existingCustomers = await stripe.customers.list({
    email: userEmail,
    limit: 1,
  });

  //   console.log(existingCustomers);

  if (existingCustomers.data.length > 0) {
    // Customer already exists
    customer = existingCustomers.data[0];

    // Check if the customer already has an active subscription
    const subscriptions = await stripe.subscriptions.list({
      customer: customer.id,
      status: "active",
      limit: 1,
    });

    if (subscriptions.data.length > 0) {
      // Customer already has an active subscription, send them to biiling portal to manage subscription

      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: customer.id,
        return_url: "http://localhost:3000/",
      });
      return res.status(409).json({ redirectUrl: stripeSession.url });
    }
  } else {
    // No customer found, create a new one
    customer = await stripe.customers.create({
      email: userEmail,
      metadata: {
        userId: auth0UserId, // Replace with actual Auth0 user ID
      },
    });
  }

  //   console.log(customer);

  // Now create the Stripe checkout session with the customer ID
  const session = await stripe.checkout.sessions.create({
    success_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
    payment_method_types: ["card"],
    mode: "subscription",
    billing_address_collection: "auto",
    line_items: [
      {
        price_data: {
          currency: "inr",
          product_data: {
            name: "Online Video Editor",
            description: "Unlimited Viedo Edits!",
          },
          unit_amount: 20000,
          recurring: {
            interval: "month",
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      userId: auth0UserId,
    },
    // customer_email: "hello@tricksumo.com",
    customer: customer.id, // Use the customer ID here
  });

  res.json({ id: session.id });
});

// Order fulfilment route
// =====================================================================================
// =====================================================================================
// =====================================================================================

// webhook for subscription



app.listen(3001, () => {
  console.log("Server is running on port 3001");
});

process.on("SIGINT", () => {
  client.close().then(() => {
    console.log("MongoDB disconnected on app termination");
    process.exit(0);
  });
});
