const express = require('express');

const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  StripeCheckout,
  searchProduct,
  stripeProductWebhook,
  Crypto,
  CryptoWebhook,
} = require("../controllers/productControllers");
const router = require("express").Router();
const authChecker = require("../middlewares/adminAuthChecker"); // Import your admin auth middleware
const authChecker2 = require("../middlewares/clientAuthChecker"); // Import your admin auth middleware

// Product Routes
router.route("/products").get(getAllProducts); // Fetch all products
router.route("/products/:id").get(getSingleProduct); // Fetch a single product
router.route("/products").post(authChecker, createProduct); // Create a new product
router.route("/products").patch(authChecker, updateProduct); // Update a product
router.route("/products").delete(authChecker, deleteProduct); // Delete a product
router.route('/products/search').get(searchProduct); // Search for products

router
  .route("/stripe/create-checkout-session")
  .post(authChecker2, StripeCheckout); // Post a checkout session with Stripe
  
router
  .route("/stripe/purchase/webhook")
  .post(express.raw({ type: "application/json" }), stripeProductWebhook); 
  // Post a checkout session with Stripe

router.route("/crypto/create-checkout-session").post(authChecker2, Crypto); // Post a checkout session with Crypto

router.route("/crypto/product/webhook").post(CryptoWebhook); // Post a checkout session with CryptoWebhook

module.exports = router;
