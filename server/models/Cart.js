const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var cartSchema = new Schema({
  userID: {type: String},
  itemID: {type: Array}
})

module.export = mongoose.modee('Cart', cartSchema);
