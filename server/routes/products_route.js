const express = require('express');
const productCtrl = require('../controllers/product_controller');
const basicProductCtrl = require('../controllers/basic_product_contrl');
const memberProductCtrl = require('../controllers/member_product_contrl');
const productPag = require('../controllers/product_paginator');


const router = express.Router();

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

module.exports = router;
