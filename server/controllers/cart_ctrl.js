const Cart = require('../models/Cart');
const User = require('../models/User');
const UserSession = require('../models/UserSession');

module.exports = {

  addProductInCart: function(req,res){
     Cart
       .create({
         product_name: req.body.product_name,
         quantity: req.body.quantity,
         purchase_price: req.body.price,
         itemID: req.body.itemID,
         userID: req.body.userID
        })
       .then( newProduct => {
         User.findOneAndUpdate({_id: newProduct.userID}, { $push: {productsInCart: newProduct._id }})
          .then( userUpdate => {
            return res.json(userUpdate)
          })
       })
       .catch(err => res.status(422).json(err))
  }
}; // end export
