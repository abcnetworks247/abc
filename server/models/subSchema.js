const mongoose = require("mongoose");

const subSchema = new mongoose.Schema({
  user: { type: mongoose.Types.ObjectId, ref: "Client" },
  price: { type: Number, required: true },
  subscriptionType: {
    type: String,
    enum: ["monthly", " yearly"],
    required: true,
  },
  package: { type: String, required: true },
  paymentType: { type: String, required: true },
  status: { type: String, 
    enum: ["active", "canceled"],
    default: "canceled",
    required: true },
  startDate: { type: Date, required: true, default: Date.now },
  renewalDate: { type: Date, required: true },
});

const SubscriptionPlan = mongoose.model("SubscriptionPlan", subSchema);

module.exports = {
  SubscriptionPlan, // Corrected export syntax
};
