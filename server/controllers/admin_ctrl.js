const Admin = require('../models/Admin');
const AdminSession = require('../models/AdminSession');
const Product = require('../models/Product_model');

module.exports = {
  findAllAdmins: function(req, res, err){
    Admin.find()
      .populate({path: 'Product', select: 'ObjectId'})
      .then(data => {
        // console.log(res.json(data));
        return res.send({
          successful_loaded: true,
          message: "All Admins Information",
          data: data
        })
      })
      .catch(err)
  },

  findSingleAdmin: function(req, res, err){
    Admin.findById(req.query._id)
      .then(data => {
        return res.send({
          successful_loaded: true,
          message: "Admin Information",
          data: data
        })
      })
      .catch(err)
  },

  findByEmail: function(req, res){
    Admin.findOne({email: req.query.email})
      .then(data => {
        return res.json(data)
      })
  },

  addAdmin: function(req, res, next){
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

   Admin.find({ email: email }, (err, previousAdmins) => {
     if (err) {
       return res.send({
         success: false,
         message: 'Error: Server error'
       });
     } else if (previousAdmins.length > 0) {
       return res.send({
         success: false,
         message: 'Error: Account already exist.'
       });
     }
     // Save the new admin
     const newAdmin = new Admin();
     newAdmin.email = email;
     newAdmin.password = newAdmin.generateHash(password);
     newAdmin.save((err, admin) => {
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
 }, // end addAdmin

 adminLogin : function(req, res, next){
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
   Admin.find({ email: email }, (err, admins) => {
     if (err) {
       return res.send({
         success: false,
         message: 'Error: server error'
       });
     }
     if (admins.length != 1) {
       return res.send({
         success: false,
         message: 'Error: User E-mail Incorrect'
       });
     }
     const admin = admins[0];
     if (!admin.validPassword(password)) {
       return res.send({
         success: false,
         message: 'Error: Password Incorrect'
       });
     }
     // Otherwise correct admin
     const adminSession = new AdminSession();
     adminSession.adminId = admin._id;
     adminSession.save((err, doc) => {
       if (err) {
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

 adminLogOut: function(req, res, next){
   const token = req.query.token;
   // ?token=test
   // Verify the token is one of a kind and it's not deleted.
   AdminSession.findOneAndUpdate({ _id: token }, { $set: { isDeleted:true }}, null, (err, sessions) => {
       if (err) {
         console.log(err);
         return res.send({
           success: false,
           message: 'Error: Server error'
         });
       }else {
         return res.send({
           success: true,
           message: 'Log Out Admin Successfully'
       })
     }
   });
 },


 adminVerify: function(req, res, next){
   const token = req.query.token;

   AdminSession.find({ _id: token, isDeleted: false }, (err, sessions) => {
     if (err) {
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

 adminVerifyAPI: function(req, res, next){
   const token = req.query.token;

   AdminSession.find({ _id: token, isDeleted: false }, (err, sessions) => {
     if (err) {
       return res.send({
         success: false,
         message: 'Error: Session Server error'
       });
     }
     if (sessions.length != 1) {
       return res.send({
         success: false,
         message: 'Error: session no log Invalid'
       });
     } else {
       next()
     };
   })
 }
} // end module export
