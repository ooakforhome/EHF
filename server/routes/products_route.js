const express = require('express');
const productCtrl = require('../controllers/product_controller');

const router = express.Router();

// API routes
router.route("/api/products")
  .get(productCtrl.getProducts)
  .post(productCtrl.addProduct);

router.route("/api/product/:_id")
  .get(productCtrl.getProductsById)
  .put(productCtrl.updateProduct)
  .delete(productCtrl.deleteProduct);

router.route("/api/products/:Category_type")
  .get(productCtrl.getCategory);

router.route("/api/allproducts")
  .get(productCtrl.renderSearch);


module.exports = router;
