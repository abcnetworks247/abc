const Auth = require("../models/clientAuthSchema"); // Assuming your user model is named 'Auth'
const { StatusCodes } = require("http-status-codes");
const SubscriptionModel = require("../models/subscriptionSchema");
const SubscriptionJoi = require("../Utils/SubscriptionJoi");
const path = require("path");
const Client = require("../models/clientAuthSchema");
const sendMail = require("../Utils/sendMail");
const dotenv = require("dotenv").config();
const fs = require("fs");
const ejs = require("ejs");

const {
  NotFoundError,
  UnAuthorizedError,
  ValidationError,
} = require("../errors/index");

const stripe = require("stripe")(process.env.STRIPE_SECRETE_KEY);
const stripeWebhookSecret = process.env.STRIPE_SUBSCRIPTION_WEBHOOK_SECRETE;
const localurl = process.env.CLIENT_URL;

const adminUrl = process.env.ADMIN_URL;
const serverUrl = process.env.SERVER_URL;
const clientUrl = process.env.CLIENT_URL;

const createSubscription = async (req, res) => {
  console.log("Create subscription");

  const user = req.user;
  const item = req.body;
  let customer;

  console.log("item level", item.level);

  try {
    if (!user) {
      throw new UnAuthorizedError("User must be logged in to subscribe");
    }

    const existingCustomer = await stripe.customers.list({
      email: user.email,
      limit: 1,
    });

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
        name: user.fullname,
        metadata: {
          userId: user._id, // Replace with actual Auth0 user ID
          description: item.level,
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
              description: `As a ${item.level} subscriber, ${item.description}. you will be eligible for ${item.features}`,
            },
            unit_amount: item.price * 100,
            recurring: {
              interval: item.type,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: user._id,
        description: "testing level",
      },
      customer: user._id,
    });

    res.status(StatusCodes.OK).json({ url: session.url });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const SubWebhook = async (req, res) => {
  console.log("Subscriptions webhook currently active");

  const payload = req.body;
  const templatePath = path.join(__dirname, "../views/subscriptionView.ejs");
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, stripeWebhookSecret);
  } catch (err) {
    console.error("Webhook Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log("New webhook event received:", event.type);

  switch (event.type) {
    case "invoice.payment_succeeded": {
      const invoicePaymentSucceeded = event.data.object;
      const email = invoicePaymentSucceeded.customer_email;

      // Define level ranges
      const monthlyLevelRanges = [
        { minAmount: 10, maxAmount: 50, level: "copper" },
        { minAmount: 55, maxAmount: 100, level: "silver" },
        { minAmount: 105, maxAmount: 200, level: "gold" },
        { minAmount: 500, maxAmount: Infinity, level: "diamond" },
      ];
      const yearlyLevelRanges = [
        { minAmount: 120, maxAmount: 600, level: "copper" },
        { minAmount: 660, maxAmount: 1200, level: "silver" },
        { minAmount: 1260, maxAmount: 2400, level: "gold" },
        { minAmount: 6000, maxAmount: 12000, level: "diamond" },
        { minAmount: 12000, maxAmount: Infinity, level: "titanium" },
      ];

      function determineLevel(amount, planType) {
        const ranges =
          planType === "month" ? monthlyLevelRanges : yearlyLevelRanges;
        const range = ranges.find(
          (range) => amount >= range.minAmount && amount <= range.maxAmount
        );
        return range ? range.level : "Unknown";
      }

      try {
        const subscription = await stripe.subscriptions.retrieve(
          invoicePaymentSucceeded.subscription
        );
        const planType = subscription.plan.interval;
        const amount = subscription.plan.amount / 100;

        const level = determineLevel(amount, planType);
        if (level === "Unknown") {
          console.error(
            "Could not determine subscription level for amount:",
            amount
          );
          return res.status(400).send("Invalid subscription amount");
        }

        console.log("Subscription Level:", level, "for email:", email);

        const user = await Client.findOne({ email });
        if (!user) {
          console.error("User not found:", email);
          return res.status(404).send("User not found");
        }

        const periodStartDate = new Date(
          subscription.current_period_start * 1000
        );
        const periodEndDate = new Date(subscription.current_period_end * 1000);
        const country =
          invoicePaymentSucceeded.customer_address?.country || "Unknown";
        const paymentUrl = invoicePaymentSucceeded.hosted_invoice_url;

        const subData = {
          email: user.email,
          name: user.fullname,
          amount,
          currency: subscription.currency,
          country,
          subscription_period_start: periodStartDate,
          subscription_period_end: periodEndDate,
          subscription_id: subscription.id,
          plan_id: subscription.plan.id,
          plan_type: planType,
          quantity: subscription.quantity,
          subscription_status: "Paid",
          hosted_invoice_url: paymentUrl,
          subscription_name:
            invoicePaymentSucceeded.lines.data[0]?.description || "Unknown",
        };

        const { error, value } = SubscriptionJoi.validate(subData);
        if (error) throw new ValidationError("Invalid subscription data");

        const newSubscription = await SubscriptionModel.create(value);
        user.subscriptionhistory.unshift(newSubscription._id);
        await user.save();

        console.log("Subscription updated successfully for:", user.email);

        const renderHtml = await ejs.renderFile(templatePath, {
          userFullname: user.fullname,
          userEmail: user.email,
          amount,
          paymenturl: paymentUrl,
          renewalDate: periodEndDate,
        });

        await sendMail({
          email: user.email,
          subject: "Our Heartfelt Thanks for Your Generous Support!",
          html: renderHtml,
        });

        await Client.findByIdAndUpdate(user._id, { userpackage: level });

        console.log("Subscription email sent successfully.");
      } catch (err) {
        console.error("Error processing subscription:", err);
        return res.status(500).send("Internal Server Error");
      }
      break;
    }

    case "customer.subscription.updated": {
      const updatedSubscription = event.data.object;

      if (updatedSubscription.cancel_at_period_end) {
        console.log(
          `Subscription ${updatedSubscription.id} was set to cancel.`
        );
      } else {
        console.log(`Subscription ${updatedSubscription.id} was restarted.`);
      }
      break;
    }

    case "invoice.payment_failed": {
      const invoicePaymentFailed = event.data.object;
      const email = invoicePaymentFailed.customer_email;

      try {
        const user = await Client.findOne({ email });
        if (!user) {
          console.error("User not found for failed payment:", email);
          return res.status(404).send("User not found");
        }

        await Client.findByIdAndUpdate(user._id, { userpackage: "basic" });
        console.log(`Payment failed for ${email}, reverted to Basic plan.`);
      } catch (err) {
        console.error("Error handling failed payment:", err);
        return res.status(500).send("Internal Server Error");
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).end();
};


// Fetch all subscription plans from the database
const getAllSubscriptionPlans = async (req, res) => {
  try {
    const { userRole } = req;
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const perPage = req.query.perPage ? parseInt(req.query.perPage) : 10;

    // Check if the user has the required role to access subscription plans
    if (userRole === "superadmin" || userRole === "admin") {
      // Calculate the number of documents to skip
      const skip = (page - 1) * perPage;

      // Fetch subscription plans from the database with pagination
      const subscriptionPlans = await SubscriptionPlan.find()
        .skip(skip)
        .limit(perPage);

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
  SubWebhook,
};
