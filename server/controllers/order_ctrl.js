const Order = require('../models/Order');


module.exports = {

  createOrder: function(req, res){
    Order
      .create(req.body)
      .then(newOrder => res.json(newOrder))
      .catch(err => res.status(422).json(err));
  }

};
