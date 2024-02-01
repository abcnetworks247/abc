const router = require("express").Router();
const authChecker = require("../middlewares/adminAuthChecker");
const {
  CreateTerms,
  ReadTerms,
  UpdateTerms,
  CreatePolicy,
  ReadPolicy,
  UpdatePolicy,
  CreateAbout,
  ReadAbout,
  UpdateAbout,
} = require("../controllers/pagesController");


// Terms Routes
router.route("/terms").get(ReadTerms);
router.route("/terms").post(authChecker, CreateTerms);
router.route("/terms").patch(authChecker, UpdateTerms);


// Policy Routes
router.route("/policy").get(ReadPolicy);
router.route("/policy").post(authChecker, CreatePolicy);
router.route("/policy").patch(authChecker, UpdatePolicy);


// Policy Routes
router.route("/about").get(ReadAbout);
router.route("/about").patch(authChecker, CreateAbout);
router.route("/about").patch(authChecker, UpdateAbout);


module.exports = router;
