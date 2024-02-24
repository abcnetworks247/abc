const mongoose = require("mongoose");

// Define Donation Schema
const orderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, required: true },
  payment_Date: { type: String, required: true },
  payment_Time: { type: String, required: true },
  cart: { type: Array, required: true },
  delivery_Status: {
    type: String,
    required: true,
    enum: ["pending", "inprogress", "failed", "completed"],
    default: "pending",
  },
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
const Order = mongoose.model("OrderHistory", orderSchema);

module.exports = Order;
