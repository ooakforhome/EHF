const express = require('express');
const cartCtrl = require('../controllers/cart_ctrl');

const router = express.Router();

// API
  router.route("/api/cart/addtocart")
    .post(cartCtrl.addProductInCart);

  router.route("/api/cart/updateqtyincart")
    .put(cartCtrl.updateQtyInCart);

  router.route("/api/cart/removeacartitem")
    .delete(cartCtrl.removeACartItem);


module.exports = router;
