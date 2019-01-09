const express = require('express');
const cartCtrl = require('../controllers/cart_ctrl');

const router = express.Router();

// API
  router.route("/api/cart/addtocart")
    .post(cartCtrl.addProductInCart);

module.exports = router;
