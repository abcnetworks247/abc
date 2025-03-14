const router = require("express").Router();
const authChecker = require("../middlewares/adminAuthChecker");
const {
  CreateNewsUpdate,
  ReadAllNewsUpdate,
  DeleteNewsUpdate,
  UpdateNewsUpdate,
  UpdateNewsUpdatePositions,
  CreateNewsType,
  ReadAllNewsType,
  UpdateNewsType,
  DeleteNewsType,
  UpdateNewsTypePositions,
  CreateNewsCat,
  ReadAllNewsCat,
  UpdateNewsCat,
  DeleteNewsCat,
  CreateProductCat,
  ReadAllProductCat,
  UpdateProductCat,
  DeleteProductCat,
} = require("../controllers/CategoryController");

// News Update Routes
router.route("/news/update").post(authChecker, CreateNewsUpdate);
router
  .route("/news/update/reorder")
  .put(authChecker, UpdateNewsUpdatePositions);
router.route("/news/update").get(ReadAllNewsUpdate);
router.route("/news/update").patch(authChecker, UpdateNewsUpdate);
router.route("/news/update").delete(authChecker, DeleteNewsUpdate);

// News Type Routes
router.route("/news/type").post(authChecker, CreateNewsType);
router.route("/news/type/reorder").put(authChecker, UpdateNewsTypePositions);
router.route("/news/type").get(ReadAllNewsType);
router.route("/news/type").patch(authChecker, UpdateNewsType);
router.route("/news/type").delete(authChecker, DeleteNewsType);

// News Category Routes
router.route("/news/category").post(authChecker, CreateNewsCat);
router.route("/news/category").get(ReadAllNewsCat);
router.route("/news/category").patch(authChecker, UpdateNewsCat);
router.route("/news/category").delete(authChecker, DeleteNewsCat);

// Product Category Routes
router.route("/product/category").post(authChecker, CreateProductCat);
router.route("/product/category").get(ReadAllProductCat);
router.route("/product/category").patch(authChecker, UpdateProductCat);
router.route("/product/category").delete(authChecker, DeleteProductCat);

module.exports = router;
