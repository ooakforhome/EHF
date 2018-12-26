const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Product = require('./Product_model');

const UserSchema = new mongoose.Schema({
  username: { type: String },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  password: {
    type: String,
    default: ''
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  signUpDate: {
    type: Date,
    default: Date.now()
  },
  shipping_address: {
    recipient_name: {type: String, required: 'Recipient name is required'},
    address1: {type: String, required: 'Street is required'},
    address2: {type: String },
    city: {type: String, required: 'City is required'},
    state: {type: String},
    zipcode: {type: String, required: 'Zip Code is required'},
    country: {type: String, default: 'US'},
    phone: {type: String }
  },
  allProducts: [{type: mongoose.Schema.Types.ObjectId, ref: Product}]
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('User', UserSchema);
