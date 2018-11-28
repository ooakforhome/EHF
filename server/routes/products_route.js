const express = require('express');
const productCtrl = require('../controllers/product_controller');
const basicProductCtrl = require('../controllers/basic_product_contrl');
const memberProductCtrl = require('../controllers/member_product_contrl');
const adminProductCtrl = require('../controllers/admin_product_contrl');
const productPag = require('../controllers/product_paginator');


const router = express.Router();

// Basic API routes
router.route("/api/basic/products")
  .get(basicProductCtrl.getProductsBasic);

router.route("/api/basic/product/:_id")
  .get(basicProductCtrl.getProductByIdBasic);


// Member API routes
router.route("/api/member/products")
  .get(memberProductCtrl.getProductsMember);

router.route("/api/member/product/:_id")
  .get(memberProductCtrl.getProductByIdMember);


// Admin API routes
router.route("/api/admin/products")
  .get(adminProductCtrl.getProductsAdmin)
  .post(adminProductCtrl.addProduct);

router.route("/api/admin/product/:_id")
  .get(adminProductCtrl.getProductByIdAdmin)
  .put(adminProductCtrl.updateProduct)
  .delete(adminProductCtrl.deleteProduct);






// API routes
router.route(`/api/products`)
  .get(productCtrl.getProducts)
  .post(productCtrl.addProduct);

router.route("/api/product/:_id")
  .get(productCtrl.getProductsById)
  .put(productCtrl.updateProduct)
  .delete(productCtrl.deleteProduct);

router.route("/api/products/:Category_type")
  .get(productCtrl.getCategory);

router.route("/api/allproducts/search")
  .get(productPag.renderPerPage);




module.exports = router;
