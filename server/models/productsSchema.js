const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
  },
  rating: {
    type: Number,
  },
  stock: { type: Number, required: true },
  brand: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  color: {
    type: String,
  },
  warranty: {
    type: String,
  },
  weight: {
    type: Number,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
