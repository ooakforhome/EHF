const express = require('express');
const productCtrl = require('../controllers/product_controller');
const basicProductCtrl = require('../controllers/basic_product_contrl');
const memberProductCtrl = require('../controllers/member_product_contrl');
const adminProductCtrl = require('../controllers/admin_product_contrl');
const adminCtrl = require('../controllers/admin_ctrl');
const productPag = require('../controllers/product_paginator');
const placeOrder = require('../controllers/order_ctrl');
const userCtrl = require('../controllers/user_ctrl');

const router = express.Router();

// Basic API routes
router.route("/api/basic/products")
  .get(basicProductCtrl.getProductsBasic);

router.route("/api/basic/products/search")
  .get(basicProductCtrl.searchProduct);

router.route("/api/basic/product/:_id")
  .get(basicProductCtrl.getProductByIdBasic);


// Member API routes
// router.route("/api/member/products")
//   .get(memberProductCtrl.getProductsMember);
// Member API routes
router.route("/api/member/products")
  .get(userCtrl.userVerifyAPI, memberProductCtrl.getProductsMember);


router.route("/api/member/products/search")
  .get(userCtrl.userVerifyAPI, memberProductCtrl.searchProductFromMember);

router.route("/api/member/product/:_id")
  .get(userCtrl.userVerifyAPI, memberProductCtrl.getProductByIdMember);

// Admin API routes
router.route("/api/admin/products")
  .get(adminCtrl.adminVerifyAPI, adminProductCtrl.getProductsAdmin)
  .post(adminProductCtrl.addProduct);

router.route("/api/admin/products/search")
  .get(adminCtrl.adminVerifyAPI, adminProductCtrl.searchProductFromAdmin);

router.route("/api/admin/product/:_id")
  .get(adminCtrl.adminVerifyAPI, adminProductCtrl.getProductByIdAdmin)
  .put(adminProductCtrl.updateProduct)
  .delete(adminProductCtrl.deleteProduct);

// Order API routes
router.route("/api/placeorder")
  .get(placeOrder.findOrder)
  .post(placeOrder.createOrder)
  .put(placeOrder.updateOrder);

router.route("/api/updateorder")
  .put(placeOrder.updateOrder);

router.route("/api/findallorders")
  .get(placeOrder.showAllOrders);
router.route("/api/findsortorders")
  .get(placeOrder.findSortOrder);


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

router.route(`/api/updatemanyproducts`)
  .put(productCtrl.updateManyProducts)



module.exports = router;
