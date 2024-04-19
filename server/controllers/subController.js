const Auth = require('../models/clientAuthSchema'); // Assuming your user model is named 'Auth'
const { StatusCodes } = require('http-status-codes');
const SubscriptionModel = require('../models/subscriptionSchema');
const SubscriptionJoi = require('../Utils/SubscriptionJoi');
const path = require('path');
const Client = require('../models/clientAuthSchema');
const sendMail = require('../Utils/sendMail');
const dotenv = require('dotenv').config();
const fs = require('fs');
const ejs = require('ejs');

const {
  NotFoundError,
  UnAuthorizedError,
  ValidationError,
} = require('../errors/index');

const stripe = require('stripe')(process.env.STRIPE_SECRETE_KEY);
const stripeWebhookSecret = process.env.STRIPE_SUBSCRIPTION_WEBHOOK_SECRETE;
const localurl = process.env.CLIENT_URL;

const adminUrl = process.env.ADMIN_URL;
const serverUrl = process.env.SERVER_URL;
const clientUrl = process.env.CLIENT_URL;

const createSubscription = async (req, res) => {
  console.log('Create subscription');

  const user = req.user;
  const item = req.body;
  let customer;

  console.log('item level', item.level);

  try {
    if (!user) {
      throw new UnAuthorizedError('User must be logged in to subscribe');
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
        status: 'active',
        limit: 1,
      });

      if (subscriptions.data.length > 0) {
        // Customer already has an active subscription, send them to biiling portal to manage subscription

        console.log('old subscription');

        const stripeSession = await stripe.billingPortal.sessions.create({
          customer: customer.id,
          return_url: `${localurl}`,
        });

        console.log('yes', stripeSession.url);

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
      payment_method_types: ['card'],
      mode: 'subscription',
      billing_address_collection: 'auto',
      customer_email: user.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
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
        description: 'testing level',
      },

      customer: user._id,
    });

    res.status(StatusCodes.OK).json({ url: session.url });
  } catch (error) {
    console.error('Error:', error);
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error: error.message });
  }
};

const SubWebhook = async (req, res) => {
  console.log('subscriptions webhook currently active');

  const payload = req.body;
  const templatePath = path.join(__dirname, '../views/subscriptionView.ejs');
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, sig, stripeWebhookSecret);
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  console.log('new web2');

  switch (event.type) {
    case 'invoice.payment_succeeded':
      const invoicePaymentSucceeded = event.data.object;

      let email = invoicePaymentSucceeded.customer_email;

      // Define level ranges and corresponding levels for monthly subscriptions
      const monthlyLevelRanges = [
        { minAmount: 10, maxAmount: 50, level: 'copper' },
        { minAmount: 55, maxAmount: 100, level: 'silver' },
        { minAmount: 105, maxAmount: 200, level: 'gold' },
        { minAmount: 500, maxAmount: Infinity, level: 'diamond' }, // No upper bound for diamond level in monthly subscription
      ];

      // Define level ranges and corresponding levels for yearly subscriptions
      const yearlyLevelRanges = [
        { minAmount: 120, maxAmount: 600, level: 'copper' },
        { minAmount: 660, maxAmount: 1200, level: 'silver' },
        { minAmount: 1260, maxAmount: 2400, level: 'gold' },
        { minAmount: 6000, maxAmount: 12000, level: 'diamond' },
        { minAmount: 12000, maxAmount: Infinity, level: 'titanium' }, // No upper bound for titanium level in yearly subscription
      ];

      // Function to determine level based on amount for monthly subscription
      function determineMonthlyLevel(amount) {
        // Find the level range that includes the given amount

        const range = monthlyLevelRanges.find(
          (range) => amount >= range.minAmount && amount <= range.maxAmount
        );

        // Return the level corresponding to the range

        return range ? range.level : 'Unknown'; // Return 'Unknown' if amount doesn't fall into any range
      }

      // Function to determine level based on amount for yearly subscription

      function determineYearlyLevel(amount) {
        // Find the level range that includes the given amount
        const range = yearlyLevelRanges.find(
          (range) => amount >= range.minAmount && amount <= range.maxAmount
        );

        // Return the level corresponding to the range
        return range ? range.level : 'Unknown'; // Return 'Unknown' if amount doesn't fall into any range
      }

      const subscription = await stripe.subscriptions.retrieve(
        event.data.object.subscription
      );

      let plantype = subscription.plan.interval;

      // Example usage:
      const amount = subscription.plan.amount / 100; // Example amount
      const level =
        plantype === 'month'
          ? determineMonthlyLevel(amount)
          : plantype === 'year'
          ? determineYearlyLevel(amount)
          : '';

      console.log('item level 2', level);

      if (level) {
        console.log('email of user: ' + email);

        const usersub = await Client.findOne({ email });

        console.log('subscription of user: ' + subscription);

        const periodEndTimestamp = subscription.current_period_end;
        const periodStartTimestamp = subscription.current_period_start;

        // Convert to milliseconds (JavaScript Date object works with milliseconds)
        const periodEndMilliseconds = periodEndTimestamp * 1000;
        const periodStartMilliseconds = periodStartTimestamp * 1000;

        // Create Date objects
        const periodEndDate = new Date(periodEndMilliseconds);
        const periodStartDate = new Date(periodStartMilliseconds);

        let amount_check = subscription.plan.amount / 100;
        let paymenturl = invoicePaymentSucceeded.hosted_invoice_url;

        const subdata1 = {
          email: usersub.email,
          name: usersub.fullname,
          amount: amount_check,
          currency: subscription.currency,
          country: invoicePaymentSucceeded.customer_address.country,
          subscription_period_start: periodStartDate,
          subscription_period_end: periodEndDate,
          subscription_id: subscription.id,
          plan_id: subscription.plan.id,
          plan_type: subscription.plan.interval,
          quantity: subscription.quantity,
          // subscription_status: subscription.status,
          subscription_status: 'Paid',
          hosted_invoice_url: paymenturl,
          subscription_name: invoicePaymentSucceeded.lines.data[0].description,
        };

        const { error, value } = SubscriptionJoi.validate(subdata1);

        if (error) {
          throw new ValidationError('Data recieved is invalid');
        }

        const newData = await SubscriptionModel.create(value);

        console.log('data now', newData);

        usersub.subscriptionhistory.unshift(newData._id);
        await usersub.save();

        const renderHtml = await ejs.renderFile(
          templatePath,
          {
            userFullname: usersub.fullname,
            userEmail: usersub.email,
            amount: amount_check,
            paymenturl: paymenturl,
            renewalDate: periodEndDate,
            // donation_data: data,
          },
          { async: true }
        );

        await sendMail({
          email: usersub.email,
          subject: 'Our Heartfelt Thanks for Your Generous Support!',
          html: renderHtml,
        });

        console.log('item level 3', level);

        await Client.findByIdAndUpdate(
          usersub._id,
          { userpackage: level },
          {
            new: true,
          }
        );

        console.log('sent successfully');
      }

      break;

    // ... handle other event types

    case 'customer.subscription.updated':
      const customerSubscriptionUpdated = event.data.object;

      // console.log(event);
      if (customerSubscriptionUpdated.cancel_at_period_end) {
        console.log(
          `Subscription ${customerSubscriptionUpdated.id} was canceled.`
        );

        // DB code to update the customer's subscription status in your database
      } else {
        console.log(
          `Subscription ${customerSubscriptionUpdated.id} was restarted.`
        );
        // get subscription details and update the DB
      }

      break;
    case 'invoice.payment_failed':
      const invoicePaymentFailed = event.data.object;

      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
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
    if (userRole === 'superadmin' || userRole === 'admin') {
      // Calculate the number of documents to skip
      const skip = (page - 1) * perPage;

      // Fetch subscription plans from the database with pagination
      const subscriptionPlans = await SubscriptionPlan.find()
        .skip(skip)
        .limit(perPage);

      res.status(StatusCodes.OK).json(subscriptionPlans);
    } else {
      throw new UnAuthorizedError('Unauthorized to access subscription plans');
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
