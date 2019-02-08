const Order = require('../models/Order');
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
    const orderID = req.body.orderid;
    Order
      .findById({_id: orderID, root: Order})
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
          $set: {payment_status: "Completed"},
          payment_id: req.body.payment_id
        })
        .then(payinfo => res.json(payinfo))
          .catch(err => res.status(422).json(err));
  }

};

  // createOrder: function(req, res){
  //   Order
  //     .create(req.body)
  //     .then(newOrder => {
  //       User.
  //        findOneAndUpdate(
  //         {_id: newOrder.user},
  //         { $push: {order_history: newOrder._id}
  //       })
  //         .then(orderInfo=>{
  //           // res.json(orderInfo.order_history)
  //         })
  //       res.send({
  //         products: newOrder.products,
  //         shipping_address: newOrder.shipping_address,
  //         payment_status: newOrder.payment_status
  //       })
  //     })
  //     .catch(err => res.status(422).json(err));
  // },

  // updateOrder: function(req, res){
  //   Order
  //     .findOneAndUpdate(
  //       { _id: req.query._id},
  //       { payment_status: req.query.payment_status,
  //         payment_id: req.query.payment_id})
  //       .then(payinfo => res.json(payinfo))
  //         .catch(err => res.status(422).json(err));
  // }
