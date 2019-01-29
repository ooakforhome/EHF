const Order = require('../models/Order');


module.exports = {

  createOrder: function(req, res){
    Order
      .create(req.body)
      .then(newOrder => res.json(newOrder))
      .catch(err => res.status(422).json(err));
  },

  updateOrder: function(req, res){
    Order
      .findOneAndUpdate({ _id: req.query._id}, {payment_status: req.query.payment_status, payment_id: req.query.payment_id})
        .then(payinfo => res.json(payinfo))
          .catch(err => res.status(422).json(err));
  }

};
   
