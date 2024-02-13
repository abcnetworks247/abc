const {
  getSingleDonation,
  getAllDonation,
  StripeCheckout,
  stripeProductWebhook,
  Crypto,
  CryptoWebhook,
} = require("../controllers/donateController");
const router = require("express").Router();
const authChecker = require("../middlewares/adminAuthChecker"); // Import your admin auth middleware
const authChecker2 = require("../middlewares/clientAuthChecker"); // Import your admin auth middleware

// Product Routes
router.route("/products").get(getAllDonation); // Fetch all products
router.route("/products/:id").get(getSingleDonation); // Fetch a single product

router
  .route("/stripe/create-checkout-session")
  .post(authChecker2, StripeCheckout); // Post a checkout session with Stripe
router.route("/stripe/product/webhook").post(stripeProductWebhook); // Post a checkout session with Stripe

router.route("/crypto/create-checkout-session").post(authChecker2, Crypto); // Post a checkout session with Crypto

router.route("/crypto/product/webhook").post(CryptoWebhook); // Post a checkout session with CryptoWebhook

module.exports = router;
