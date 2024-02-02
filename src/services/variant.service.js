const { ObjectId } = require('mongoose').Types;
const Variant = require('../models/variant.model'); // Assuming relative path
const productService = require('../services/product.service'); // Assuming separate product service

class VariantService {
  async create(variantData, productId) {
    if (!ObjectId.isValid(productId)) {
      throw new Error('Invalid product ID');
    }

    // Validate variant data (use validation library like Joi)
    // ...

    const product = await productService.findById(productId);
    if (!product) {
      throw new Error('Product not found');
    }

    const existingVariant = await Variant.findOne({ SKU: variantData.SKU });
    if (existingVariant) {
      throw new Error('SKU already exists');
    }

    const variant = new Variant({ ...variantData, product: productId });
    const savedVariant = await variant.save();

    return savedVariant;
  }

  async findAll(productId) {
    if (!ObjectId.isValid(productId)) {
      throw new Error('Invalid product ID');
    }

    const variants = await Variant.find({ product: productId });
    return variants;
  }

  async findById(variantId) {
    if (!ObjectId.isValid(variantId)) {
      throw new Error('Invalid variant ID');
    }

    const variant = await Variant.findById(variantId);
    if (!variant) {
      throw new Error('Variant not found');
    }

    return variant;
  }

  async update(variantId, variantData) {
    if (!ObjectId.isValid(variantId)) {
      throw new Error('Invalid variant ID');
    }

    // Validate variant data (use validation library like Joi)
    // ...

    const updatedVariant = await Variant.findByIdAndUpdate(variantId, variantData, { new: true });
    if (!updatedVariant) {
      throw new Error('Variant not found');
    }

    return updatedVariant;
  }

  async delete(variantId) {
    if (!ObjectId.isValid(variantId)) {
      throw new Error('Invalid variant ID');
    }

    const deletedVariant = await Variant.findByIdAndDelete(variantId);
    if (!deletedVariant) {
      throw new Error('Variant not found');
    }

    return deletedVariant;
  }
}

module.exports = new VariantService();
