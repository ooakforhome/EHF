const User = require('../models/User');
const UserSession = require('../models/UserSession');
const Product = require('../models/Product_model');

module.exports = {
  findAllUsers: function(req, res, next){
    User.find()
      .populate({path: 'Product', select: 'ObjectId'})
      .then(data => {
        console.log(res.json(data));
      })
  },

  findSingleUsers: function(req, res, next){
    User.findById({_id: req.query._id, root: User})
      .then(data => {
        console.log(res.json(data));
      })
      .next(err)
  },
  
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
         message: 'Error: Server error'
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
           message: 'Error: Server error'
         });
       }
       return res.send({
         success: true,
         message: 'Signed up'
       });
     });
   });
 }, // end addUser

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
       console.log('err 2:', err);
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
   UserSession.findOneAndUpdate({ _id: token, isDeleted: false }, { $set: { isDeleted:true }}, null, (err, sessions) => {
     if (err) {
       console.log(err);
       return res.send({
         success: false,
         message: 'Error: Server error'
       });
     }
     return res.send({
       success: true,
       message: 'Good'
     });
   });
 },


 userVerify: function(req, res, next){
   const token = req.query.token;

   UserSession.find({ _id: token, isDeleted: false }, (err, sessions) => {
     if (err) {
       console.log(err);
       console.log( "==============Error================" );
       console.log(res.json("false: Error: Server error"));
     }
     if (sessions.length != 1) {
       console.log( "==============Error================" );
       console.log(res.json("false: Error: Invalid"));
     } else {
       console.log( "==============True================" );
       console.log(res.json("True: Account varified"));
     }
   })
  }

} // end module export
//=========================================================
