const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  // Array of references to variant documents
  variants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Variant',
  }],
});

module.exports = mongoose.model('Product', productSchema);
