const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const Product = require('./Product_model');
const Cart = require('./Cart');
const Order = require('./Order');

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
    recipient_name: {type: String},
    address1: {type: String},
    address2: {type: String },
    city: {type: String},
    state: {type: String},
    zipcode: {type: String},
    country: {type: String, default: 'US'},
    phone: {type: String }
  },
  order_history: [{type: mongoose.Schema.Types.ObjectId, ref: Order}],
  productsInCart: [{type: mongoose.Schema.Types.ObjectId, ref: Cart}],
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('User', UserSchema);
