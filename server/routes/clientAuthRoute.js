const {
  signUp,
  signIn,
  userRecovery,
  userUpdatePassword,
  userVerifyPasswordReset,
  singleUser,
  currentUser,
  userUpdate,
  userSignOut,
  userDelete,
  activeUserUpdatePassword,
} = require("../controllers/clientAuthControllers");

const router = require("express").Router();
const authChecker = require("../middlewares/clientAuthChecker");
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

router.route("/user/:id").get(authChecker, singleUser);

router.route("/account/updatepassword/:token").get(userVerifyPasswordReset);
router.route("/account/updatepassword").post(userUpdatePassword);
router
  .route("/account/activeuserupdatepassword")
  .patch(authChecker, activeUserUpdatePassword);

router.route("/account").get(authChecker, currentUser);
router
  .route("/account")
  .patch(authChecker, upload.single("userphoto"), userUpdate);
  
router.route("/account/delete").delete(authChecker, userDelete);

router.route('/viewemail').get();

module.exports = router;
