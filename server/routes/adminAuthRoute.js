const {
  signUp,
  signIn,
  userRecovery,
  userUpdatePassword,
  userVerifyPasswordReset,
  singleAdmin,
  currentUser,
  userUpdate,
  userSignOut,
  userDelete,
  allAdmin,
  allClient,
  singleClient,
  deleteClient,
} = require("../controllers/adminAuthControllers");

const router = require("express").Router();
const authChecker = require("../middlewares/adminAuthChecker"); // Import your admin auth middleware
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.route("/signup").post(signUp);
router.route("/signin").post(signIn);
router.route("/recovery").post(userRecovery);
router.route("/account/signout").delete(authChecker, userSignOut);

router.route("/account/admin/:id").get(authChecker, singleAdmin);

router.route("/account/updatepassword/:token").get(userVerifyPasswordReset);
router.route("/account/updatepassword/").post(userUpdatePassword);
router.route("/account/").get(authChecker, currentUser); // Change authChecker to adminAuthChecker
router
  .route("/account")
  .patch(authChecker, upload.single("userdp"), userUpdate); // Change authChecker to adminAuthChecker
router.route("/account/delete").delete(authChecker, userDelete); // Change authChecker to adminAuthChecker

//get all admin routes by admin
router.route("/account/admin").get(authChecker, allAdmin); // Change authChecker to adminAuthChecker

//client routes by admin
router.route("/account/client").get(authChecker, allClient); // Change authChecker to adminAuthChecker
router.route("/account/client/:id").get(authChecker, singleClient); //Get Client by id
router.route("/account/client").delete(authChecker, deleteClient); // Change authChecker to adminAuthChecker
module.exports = router;
