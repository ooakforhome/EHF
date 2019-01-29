const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = "./User";
const Product = require('./Product_model');

var CartSchema = new Schema({
  product_name: {type: String},
  quantity: {type: Number},
  purchase_price: {type: Number},
  image: {type: String},
  purchase_date: { type: Date, default: Date.now()},
  itemID: {type: mongoose.Schema.Types.ObjectId, ref: Product},
  userID: {type: mongoose.Schema.Types.ObjectId, ref: User},
  active: {type: Boolean, default: true}
});

module.exports = mongoose.model('Cart', CartSchema);
