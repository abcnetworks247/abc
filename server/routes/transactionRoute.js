const {
  getAllDonate,
  getSingleDonate,
  getAllSubscription,
  getSingleSubscription,
  getAllPurchaseHistory,
  getSinglePurchaseHistory,
  getAllOrderHistory,
  getSingleOrderHistory,
  updateOrderHistory,
} = require("../controllers/transactionController");

const router = require("express").Router();
const authChecker = require("../middlewares/adminAuthChecker"); // Import your admin auth middleware



router.route("/history/donate").get(authChecker, getAllDonate);
router.route("/history/donate/:id").get(authChecker, getSingleDonate);


router.route("/history/subscribe").get(authChecker, getAllSubscription);
router.route("/history/subscribe/:id").get(authChecker, getSingleSubscription);



router.route("/history/purchase").get(authChecker, getAllPurchaseHistory);
router.route("/history/purchase/:id").get(authChecker, getSinglePurchaseHistory);


router.route("/history/order").get(authChecker, getAllOrderHistory);
router.route("/history/order/:id").get(authChecker, getSingleOrderHistory);
router.route("/history/order").patch(authChecker, updateOrderHistory);


module.exports = router;
