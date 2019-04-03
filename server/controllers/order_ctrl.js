const Order = require('../models/Order');
const CartItem = require('../models/Order');
const User = require('../models/User');

module.exports = {

  createOrder: function(req, res){
    Order
      .create(req.body)
      .then(newOrder => {
        res.send({
          _id: newOrder._id,
          products: newOrder.products,
          shipping_address: newOrder.shipping_address,
          payment_status: newOrder.payment_status
        })
      })
      .catch(err => res.status(422).json(err));
  },

  findOrder: function(req, res, next){
    const orderID = req.query.orderid;
    Order
      .findById({_id: orderID, root: Order})
        .then(info => {
          return res.json(info)
        })
        .catch(err => console.log(err))
  },

  findSortOrder: function(req, res, next){
    const began = req.query.began;
    const end = req.query.end;
    Order
      .find({payment_status: "Successful"})
        .sort({ created:1 })
        .then(info => {
          return res.json(info)
        })
        .catch(err => console.log(err))
  },

  updateOrder: function(req, res){
    Order
      .findOneAndUpdate(
        { _id: req.body._id},
        {
          $set: {payment_status: "Successful"},
          payment_id: req.body.payment_id
        })
        .then(payinfo => res.json(payinfo))
          .catch(err => res.status(422).json(err));
  },

  showAllOrders: function(req,res){
    Order
      .find()
        .populate({path: 'products.product_id'})
        .then(allData => res.json(allData))
        .catch(err => res.status(422).json(err))
  }

};
