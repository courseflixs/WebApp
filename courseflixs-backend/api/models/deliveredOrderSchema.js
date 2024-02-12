const mongoose = require('mongoose');

const conn = mongoose.Collection;
const deliveredOrderSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  product_id: {
    type: mongoose.Schema.Types.ObjectId,
  },
  user_name: {
    type: String,
  },
  product_name: {
    type: String,
  },
  bargain_price: {
    type: Number,
  },
  product_link: {
    type: String,
  },
  points: {
    type: Number,
  },

}, { timestamps: true });

const deliveredOrder = mongoose.model('delivered_orders', deliveredOrderSchema);
module.exports = deliveredOrder;
