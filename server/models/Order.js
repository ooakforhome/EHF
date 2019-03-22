const mongoose = require('mongoose');
const Product = require('./Product_model')

const CartItemSchema = new mongoose.Schema({
  product_id: {type: mongoose.Schema.ObjectId, ref: 'Product'},
  product_name: {type: String},
  purchase_price: {type: Number},
  quantity: Number,
  ship_tracking: {type: String},
  status: {type: String,
    default: 'Not processed',
    enum: ['Not processed' , 'Processing', 'Shipped', 'Delivered', 'Cancelled']}
})

module.exports = mongoose.model('CartItem', CartItemSchema)


const OrderSchema = new mongoose.Schema({
  products: [CartItemSchema],
  customer_name: {
    type: String,
    trim: true,
    required: 'Name is required'
  },
  customer_email: {
    type: String,
    trim: true,
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
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
  payment_id: {},
  payment_status: {type: String, default: "Not Successful"},
  fullfill_status: {type: String, default: "Incomplete"},
  updated: Date,
  created: {
    type: Date,
    default: Date.now
  },
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Order', OrderSchema)
