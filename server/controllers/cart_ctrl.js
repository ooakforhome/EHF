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
         image: req.body.image,
         itemID: req.body.itemID,
         userID: req.body.userID
        })
       .then( newProduct => {
         User.findOneAndUpdate({_id: newProduct.userID}, { $push: {productsInCart: newProduct._id }})
          res.json(newProduct.itemID)
       })
       .catch(err => res.status(422).json(err))
  },
  updateQtyInCart: function(req,res){
    Cart
      .findOneAndUpdate({ _id: req.query._id}, { quantity: req.body.quantity })
        .then(update => {
          return res.json(update)
        })
        .catch(err => res.status(422).json(err))
  },
  removeACartItem: function(req, res, next){
    // const userID = req.body.userID;
    const cartID = req.body.cartID;
    // const productInCart = req.body.productInCart;
    Cart
     .findByIdAndRemove({_id: cartID}, (err)=>{
        if(!err){
          // return res.send({succssful : "true"})
          User
            .updateOne({ productsInCart: cartID },
            { $pull : { productsInCart : cartID }}, (err)=>{
              if(err) throw err;
              return res.send({succssful : "true"})
            })
        } else {
          return res.send({succssful : "false"})
        }
     })
   }
}; // end export
