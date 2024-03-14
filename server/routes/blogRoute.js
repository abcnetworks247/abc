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

const {
  getAllBlog,
  createBlog,
  getSingleBlog,
  updateBlog,
  deleteBlog,
  getUserBlog,
  postReaction,
  searchBlog,
  getBlogsByType,
} = require("../controllers/blogControllers");

const router = require("express").Router();

router.route("/").get(getAllBlog);
router.route("/:id").get(getSingleBlog);
router.route("/create").post(authChecker, createBlog);
router.route("/edit/:id").get(authChecker, getUserBlog);

router.route("/like").post(authChecker, postReaction);

router.route("/update").patch(authChecker, updateBlog);
router.route("/delete").delete(authChecker, deleteBlog);
router.route("/search").get(searchBlog);

router.route("/news/:id").get(getBlogsByType);

module.exports = router;
