const User = require('../models/User');
const UserSession = require('../models/UserSession');
const Product = require('../models/Product_model');
const Cart = require('../models/Cart');
const Order = require('../models/Order')

module.exports = {
  addUser: function(req, res, next){
    const { body } = req;
    const { password } = body;
    let { email } = body;

   if (!email) {
     return res.send({
       success: false,
       message: 'Error: Email cannot be blank.'
     });
   }
   if (!password) {
     return res.send({
       success: false,
       message: 'Error: Password cannot be blank.'
     });
   }
   email = email.toLowerCase();
   email = email.trim();
   // Steps:
   // 1. Verify email doesn't exist
   // 2. Save
   User.find({ email: email }, (err, previousUsers) => {
     if (err) {
       return res.send({
         success: false,
         message: 'Error: Server error - find'
       });
     } else if (previousUsers.length > 0) {
       return res.send({
         success: false,
         message: 'Error: Account already exist.'
       });
     }
     // Save the new user
     const newUser = new User();
     newUser.email = email;
     newUser.password = newUser.generateHash(password);
     newUser.save((err, user) => {
       if (err) {
         return res.send({
           success: false,
           message: err
         });
       }
       return res.send({
         success: true,
         message: 'Signed up'
       });
     });
   });
 }, // end addUser

 addMember: function(req, res, next){
   const { body } = req;
   const { password } = body;
   let { email } = body;

  if (!email) {
    return res.send({
      success: false,
      message: 'Error: Email cannot be blank.'
    });
  }
  if (!password) {
    return res.send({
      success: false,
      message: 'Error: Password cannot be blank.'
    });
  }
  email = email.toLowerCase();
  email = email.trim();
  // Steps:
  // 1. Verify email doesn't exist
  // 2. Save
  User.find({ email: email }, (err, previousUsers) => {
    if (err) {
      return res.send({
        success: false,
        message: 'Error: Server error - find'
      });
    } else if (previousUsers.length > 0) {
      return res.send({
        success: false,
        message: 'Error: Account already exist.'
      });
    }
    // Save the new user
    const newUser = new User();
    newUser.email = email;
    newUser.password = newUser.generateHash(password);
    newUser.username = req.body.username;
    newUser.shipping_address = req.body.shipping_address;
    newUser.save((err, user) => {
      if (err) {
        return res.send({
          success: false,
          message: err
        });
      } else {
        const userSession = new UserSession();
        userSession.userId = user._id;
        userSession.save((err, doc) => {
          if (err) {
            console.log(err);
            return res.send({
              success: false,
              message: 'Error: server error'
            });
          }
          return res.send({
            success: true,
            message: 'Valid sign in',
            token: doc._id,
            userId: user._id
          });
        })
      }
    });
  });
 }, // end addUser


 // updateUser : function(req, res){
 //   User.findOneAndUpdate({_id: req.query._id}, req.body,{new: true})
 //    .then(info => { return res.json(info.shipping_address)})
 //    .catch(err => res.status(422).json(err))
 // },

 updateUser : function(req, res){
   User.findOneAndUpdate({_id: req.query._id}, req.body,{new: true})
    .then((info, err) => {
      if(err){
        return res.send({
          success: false,
          error: err
        })
      } else {
        return res.send({
          success: true,
          username: info.username,
          email: info.email,
          shipping_address: info.shipping_address
        })
      }
    })
    .catch(err => res.status(422).json(err))
 },

 userLogin : function(req, res, next){
   const { body } = req;
   const { password } = body;
   let { email } = body;
   if (!email) {
     return res.send({
       success: false,
       message: 'Error: Email cannot be blank.'
     });
   }
   if (!password) {
     return res.send({
       success: false,
       message: 'Error: Password cannot be blank.'
     });
   }
   email = email.toLowerCase();
   email = email.trim();
   User.find({ email: email }, (err, users) => {
     if (err) {
       return res.send({
         success: false,
         message: 'Error: server error'
       });
     }
     if (users.length != 1) {
       return res.send({
         success: false,
         message: 'Error: Invalid'
       });
     }
     const user = users[0];
     if (!user.validPassword(password)) {
       return res.send({
         success: false,
         message: 'Error: Invalid'
       });
     }
     // Otherwise correct user
     const userSession = new UserSession();
     userSession.userId = user._id;
     userSession.save((err, doc) => {
       if (err) {
         console.log(err);
         return res.send({
           success: false,
           message: 'Error: server error'
         });
       }
       return res.send({
         success: true,
         message: 'Valid sign in',
         token: doc._id
       });
     });
   });
 },


 userLogOut: function(req, res, next){
   const token = req.query.token;
   // ?token=test
   // Verify the token is one of a kind and it's not deleted.
   UserSession.findOneAndUpdate({ _id: token }, { $set: { isDeleted:true }}, null, (err, sessions) => {
     if (err) {
       console.log(err);
       return res.send({
         success: false,
         message: 'Error: Server error'
       });
     }
     return res.send({
       success: true,
       message: 'User Log Out successfully'
     });
   });
 },


 userVerify: function(req, res, next){
   const token = req.query.token;
   // console.log(token)
   UserSession.find({ _id: token, isDeleted: false }, (err, sessions) => {
     if (err) {
       console.log(err);
       return res.send({
         success: false,
         message: 'Error: Server error'
       });
     }
     if (sessions.length != 1) {
       return res.send({
         success: false,
         message: 'Error: Invalid'
       });
     } else {
       return res.send({
         success: true,
         message: 'Good'
       });
     }
   })
 },

 userVerifyAPI: function(req, res, next){
   const token = req.query.token;

   UserSession.find({ _id: token, isDeleted: false }, (err, sessions) => {
     if (err) {
       console.log(err);
       return res.send({
         success: false,
         message: 'Error: Server error'
       });
     }
     if (sessions.length != 1) {
       return res.send({
         success: false,
         message: 'Error: Invalid'
       });
     } else {
       next()
       };
   })
 },

 findAllUsers: function(req, res, next){
   User.find()
     .populate({path: 'Product', select: 'ObjectId'})
     .then(data => {
       // console.log(res.json(data));
       return res.send({
          members_account: data
       })
     })
 },

 findSingleUser: function(req, res, next){
   User.findById({_id: req.query._id, root: User})
     .then(info => {
       return res.json(info)
     })
       .catch(next)
 },

 findUserByEmail: function(req, res, next){
   User.findOne({ email: req.query.email}, (err, data)=>{
     if (err) {
       return res.send({
         success: false,
         message: 'Error: Server error'
       });
     }
       return res.json(data._id)
   })
     .catch(next)
 },

 findUserIdByToken: function(req, res){
   UserSession.findById({_id: req.query._id})
    .then(data=>{
      return res.json(data.userId);
    })
 },

 findUserByToken: function(req, res, next){
   UserSession.findById({_id: req.query._id})
    .then(data=>{
      User.findById({_id: data.userId, root: User})
        .then(info => {
          return res.send({
            "shipping_address" : info.shipping_address,
            "email" : info.email,
            "username": info.username,
            "items_in_cart": info.productsInCart
          })
        })
    })
    .catch(next)
 },

 userGetAddress: function(req, res, next){
   const userID = req.query.userID;
   User.findById({_id: userID, root: User})
     .then(info => {
       return res.send({
         "address" : info.shipping_address,
         "email" : info.email,
         "username": info.username
       })
     })
       .catch(next)
 },

 userShowAllItemsAdded: function(req, res, next){
   UserSession.findById({_id: req.query._id})
    .then(data=>{
      User.findById({_id: data.userId, root: User})
        .populate('productsInCart')
        .then( productinfo => {
          return res.send(productinfo.productsInCart)
        })
    })
 },

 userShowNumberItemsAdded: function(req, res, next){
   UserSession.findById({_id: req.query._id})
    .then(data=>{
      User.findById({_id: data.userId, root: User})
        .populate('productsInCart')
        .then( productinfo => {
          return res.send({"number_in_cart": productinfo.productsInCart.length})
        })
    })
 },

 userRemoveACartItem: function(req, res, next){
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
  },

 emptyUserCart: function(req, res, err){
   // const userID = req.body.userID;
   const userID = req.query._id;
   // find and remove info in cart
   User
    .findOneAndUpdate({ _id: userID }, { $set: { productsInCart: [] }})
      .then(info => {
        return res.send({test: info.data})
      })
 },

 userPaymentSuccessful: function(req, res, next){
   // const userID = req.body.userID;
   const userID = req.body._id;
   const orderID = req.body.orderid;
   const paymentID = req.body.paymentid;
   // find and remove info in cart

   User
    .findOneAndUpdate(
      { _id: userID },
      {
        $set: { productsInCart: [] },
        $push: { order_history: orderID}
      })
      .then( userInfo => {
        Order
          .findOneAndUpdate(
            { _id: orderID },
            {
              $set: {payment_status: "Successful"},
              payment_id: paymentID
            })
            .then( sucInfo => {
              res.json(sucInfo);
            })
            .catch(err => {console.log("HERE IS THE ERROR: "+ err)})
          })
 },

 // userLimitedInfo: function(req, res, next){
 //   UserSession.findById({_id: req.query._id})
 //    .then(data=>{
 //      User
 //        .findById({_id: data.userId, root: User})
 //        .select('-password -isDeleted -signUpDate -_id')
 //        .populate({path: 'productsInCart', select: '-userID'})
 //        .populate({
 //          path: 'order_history',
 //          select: '-payment_id -user',
 //          populate: {path: 'product', model: Cart }
 //        })
 //        .then( productinfo => {
 //          return res.send(productinfo)
 //        })
 //    })
 // },

 userLimitedInfo: function(req, res, next){
   UserSession.findById({_id: req.query._id})
    .then(data=>{
      User
        .findById({_id: data.userId, root: User})
        .select('-password -isDeleted -signUpDate -_id')
        .populate({path: 'productsInCart', select: '-userID'})
        .populate({path: 'order_history', select: '-payment_id -user'})
        .then( productinfo => {
          return res.send(productinfo)
        })
    })
 }

} // end module export
//=========================================================
