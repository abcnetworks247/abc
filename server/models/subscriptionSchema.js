const mongoose = require("mongoose");

// Define Donation Schema
const subscriptionSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  country: { type: String, required: true },
  subscription_period_start: { type: Date, required: true},
  subscription_period_end: { type: Date, required: true},
  subscription_id: { type: String, required: true },
  plan_id: { type: String, required: true },
  plan_type: { type: String, required: true },
  quantity: { type: Number, required: true },
  subscription_status: { type: String, required: true },
  hosted_invoice_url: { type: String, required: true },
  subscription_name: { type: String, required: true },
});

// Create Donation model
const Subscription = mongoose.model("SubscriptionHistory", subscriptionSchema);

module.exports = Subscription;
