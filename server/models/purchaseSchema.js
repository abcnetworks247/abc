const mongoose = require("mongoose");

// Define Donation Schema
const purchaseSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  payment_Date: { type: String, required: true },
  payment_Time: { type: String, required: true },
  cart: { type: Array, required: true },
  payment_status: { type: String },
  payment_method_types: { type: String },
  transaction_Id: { type: String },
  phone: { type: String, required: true },
  address: { type: String },
  city: { type: String },
  postal_code: { type: String },
  state: { type: String },
  country: { type: String },
});

// Create Donation model
const Purchase = mongoose.model("PurchaseHistory", purchaseSchema);

module.exports = Purchase;
