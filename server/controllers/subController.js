const SubscriptionPlan = require("../models/subSchema");
const Auth = require("../models/clientAuthSchema"); // Assuming your user model is named 'Auth'
const subscriptionJoi = require("../Utils/SubJoiSchema");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  UnAuthorizedError,
  ValidationError,
} = require("../errors/index");

const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);
const localurl = process.env.CLIENT_URL;

const createSubscription = async (req, res) => {
  const user = req.user;
  const item = req.body;
  let customer;

  try {
    if (!user) {
      throw new UnAuthorizedError("User must be logged in to subscribe");
    }

    const existingCustomer = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });

    // console.log(existingCustomer);

    if (existingCustomer.data.length > 0) {
      // Customer already exists
      customer = existingCustomer.data[0];

      // Check if the customer already has an active subscription
      const subscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        status: "active",
        limit: 1,
      });

      if (subscriptions.data.length > 0) {
        // Customer already has an active subscription, send them to biiling portal to manage subscription

        console.log("old subscription");

        const stripeSession = await stripe.billingPortal.sessions.create({
          customer: customer.id,
          return_url: `${localurl}`,
        });

        console.log("yes", stripeSession.url);

        return res
          .status(StatusCodes.CONFLICT)
          .json({ redirectUrl: stripeSession.url });
      }
    } else {
      // No customer found, create a new one

      customer = await stripe.customers.create({
        email: user.email,
        metadata: {
          userId: user._id, // Replace with actual Auth0 user ID
        },
      });
    }

    const session = await stripe.checkout.sessions.create({
      success_url: `${localurl}/paymentsuccess?success=true`,
      cancel_url: `${localurl}/paymenterror?canceled=true`,
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "auto",
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
              description: `${item.description}\n \n${item.features}`,
            },
            unit_amount: item.price * 100,
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user._id,
      },

      customer: user._id,
    });

    console.log("session created for " + session);

    res.status(StatusCodes.OK).json({ id: session.id });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

// Fetch all subscription plans from the database
const getAllSubscriptionPlans = async (req, res) => {
  try {
    const { userRole } = req;

    // Check if the user has the required role to access subscription plans
    if (userRole === "superadmin" || userRole === "admin") {
      // Fetch all subscription plans from the database
      const subscriptionPlans = await SubscriptionPlan.find();

      res.status(StatusCodes.OK).json(subscriptionPlans);
    } else {
      throw new UnAuthorizedError("Unauthorized to access subscription plans");
    }
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

module.exports = {
  createSubscription,
  getAllSubscriptionPlans,
};
