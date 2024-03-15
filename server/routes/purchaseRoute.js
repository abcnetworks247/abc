const express = require("express");

const {
  StripeCheckout,
  stripeProductWebhook,
  Crypto,
  CryptoWebhook,
} = require("../controllers/PurchaseController");
const router = require("express").Router();
const authChecker = require("../middlewares/adminAuthChecker"); // Import your admin auth middleware
const authChecker2 = require("../middlewares/clientAuthChecker"); // Import your admin auth middleware
const { checkUrl } = require("../middlewares/urlChecker2");


router
  .route('/stripe/create-checkout-session')
  .post(authChecker2, StripeCheckout); // Post a checkout session with Stripe


router
  .route('/stripe/purchase/webhook').post(
    express.raw({ type: 'application/json' }), stripeProductWebhook);
// Post a checkout session with Stripe

router.route('/crypto/create-checkout-session').post(authChecker2, Crypto); // Post a checkout session with Crypto

router.route('/crypto/product/webhook').post(CryptoWebhook); // Post a checkout session with CryptoWebhook

module.exports = router;
