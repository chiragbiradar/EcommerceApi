const mongoose = require('mongoose');

const variantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  SKU: {
    type: String,
    required: true,
    unique: true,
  },
  additionalCost: {
    type: Number,
    default: 0,
  },
  stockCount: {
    type: Number,
    required: true,
  },
  // Reference to the parent product document
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
});

module.exports = mongoose.model('Variant', variantSchema);
