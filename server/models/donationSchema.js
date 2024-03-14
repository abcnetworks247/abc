const mongoose = require("mongoose");

// Define Donation Schema
const donationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  donation_Date: { type: String, required: true },
  donation_Time: { type: String, required: true },
  payment_status: { type: String, required: true },
  payment_method_types: { type: String, required: true },
  transaction_Id: { type: String, required: true },
});

// Create Donation model
const Donation = mongoose.model("donation", donationSchema);

module.exports = Donation;
