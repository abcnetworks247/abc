const express = require('express');

const {
  createSubscription,
  getAllSubscriptionPlans,
  SubWebhook,
} = require("../controllers/subController");
const authChecker = require("../middlewares/clientAuthChecker");

const router = require("express").Router();

router.route("/usersubscription").post(authChecker, createSubscription);
router
  .route("/stripe/product/webhook")
  .post(express.raw({ type: "application/json" }), SubWebhook);

module.exports = router;
