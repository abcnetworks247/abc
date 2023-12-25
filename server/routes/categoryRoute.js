const router = require("express").Router();
const authChecker = require("../middlewares/adminAuthChecker");
const {
  CreateNewsType,
  ReadAllNewsType,
  UpdateNewsType,
  DeleteNewsType,
  CreateNewsCat,
  ReadAllNewsCat,
  UpdateNewsCat,
  DeleteNewsCat,
  CreateProductCat,
  ReadAllProductCat,
  UpdateProductCat,
  DeleteProductCat,
} = require("../models/Category");

// News Type Routes
router
  .route("/news/type")
  .post(authChecker, CreateNewsType)
  .get(ReadAllNewsType)
  .put(authChecker, UpdateNewsType)
  .delete(authChecker, DeleteNewsType);

// News Category Routes
router
  .route("/news/category")
  .post(authChecker, CreateNewsCat)
  .get(ReadAllNewsCat)
  .put(authChecker, UpdateNewsCat)
  .delete(authChecker, DeleteNewsCat);

// Product Category Routes
router
  .route("/product/category")
  .post(authChecker, CreateProductCat)
  .get(ReadAllProductCat)
  .put(authChecker, UpdateProductCat)
  .delete(authChecker, DeleteProductCat);

module.exports = router;
