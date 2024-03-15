const express = require('express');

const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  HandleSearch,
} = require('../controllers/productControllers');
const router = require('express').Router();
const authChecker = require('../middlewares/adminAuthChecker'); // Import your admin auth middleware
const authChecker2 = require('../middlewares/clientAuthChecker'); // Import your admin auth middleware
const { checkUrl } = require('../middlewares/urlChecker');
const { checkUrl2 } = require('../middlewares/urlChecker2');

const checkPurchaseUrl = checkUrl(
  '/api/v1/admin/commerce',
  '/stripe/purchase/webhook'
);

// Product Routes
router.route('/products').get(getAllProducts); // Fetch all products
router.route('/products/:id').get(getSingleProduct); // Fetch a single product
router.route('/products').post(authChecker, createProduct); // Create a new product
router.route('/products').patch(authChecker, updateProduct); // Update a product
router.route('/products').delete(authChecker, deleteProduct); // Delete a product

router.route('/search').get(HandleSearch)



module.exports = router;
