const {
  createSubscription,
  getAllSubscriptionPlans,
} = require("../controllers/subController");
const authChecker = require("../middlewares/clientAuthChecker");

const router = require("express").Router();

router.route("/usersubscription").post(authChecker, createSubscription);

module.exports = router;
