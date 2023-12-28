const { getAllProducts, getSingleProduct, createProduct, updateProduct, deleteProduct } = require('../controllers/productControllers');
const router = require('express').Router();
const authChecker = require('../middlewares/adminAuthChecker'); // Import your admin auth middleware

// Product Routes
router.route('/products').get(getAllProducts); // Fetch all products
router.route('/products/:id').get(getSingleProduct); // Fetch a single product
router.route('/products').post(authChecker, createProduct); // Create a new product
router.route('/products').patch(authChecker, updateProduct); // Update a product
router.route('/products').delete(authChecker, deleteProduct); // Delete a product

module.exports = router;
