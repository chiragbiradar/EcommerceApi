const { ObjectId } = require('mongoose').Types;
const Product = require('../models/product.model'); // Assuming relative path

class ProductService {
  async findAll() {
    return await Product.find()
      .populate('variants'); // Include populated variants if needed
  }

  async findById(id) {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid product ID');
    }
    return await Product.findById(id)
      .populate('variants'); // Include populated variants if needed
  }

  async create(productData) {
    const newProduct = new Product(productData);
    return await newProduct.save();
  }

  async update(id, productData) {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid product ID');
    }
    return await Product.findByIdAndUpdate(id, productData, { new: true });
  }

  async delete(id) {
    if (!ObjectId.isValid(id)) {
      throw new Error('Invalid product ID');
    }
    return await Product.findByIdAndDelete(id);
  }

  // Add functionality for variant-related operations if needed
  // (e.g., createVariant, updateVariant, deleteVariant)
}

module.exports = new ProductService();
