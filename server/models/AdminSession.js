const mongoose = require('mongoose');
const AdminSessionSchema = new mongoose.Schema({
  adminId: {
    type: String,
    default: ''
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});
module.exports = mongoose.model('AdminSession', AdminSessionSchema);
