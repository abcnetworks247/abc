const express = require('express');

const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  HandleSearch,
  getProductsByCategory,
} = require('../controllers/productControllers');
const router = require('express').Router();
const authChecker = require('../middlewares/adminAuthChecker'); // Import your admin auth middleware
const authChecker2 = require('../middlewares/clientAuthChecker'); // Import your admin auth middleware

// Product Routes
router.route('/products').get(getAllProducts); // Fetch all products
router.route('/products/:id').get(getSingleProduct); // Fetch a single product
router.route('/products').post(authChecker, createProduct); // Create a new product
router.route('/products').patch(authChecker, updateProduct); // Update a product
router.route('/products').delete(authChecker, deleteProduct); // Delete a product

router.route('/search').get(HandleSearch);
router.route('/productcategory').get(getProductsByCategory);

module.exports = router;
