const express = require('express');
const { Product, Variant } = require('../models'); // Adjust path as needed

const router = express.Router();

// Get all variants for a product
router.get('/products/:productId/variants', async (req, res) => {
  try {
    const variants = await Variant.find({ product: req.params.productId });
    res.json(variants);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific variant
// Get a specific variant
router.get('/products/:productId/variants/:id', async (req, res) => {
    try {
      const variant = await Variant.findById(req.params.id).populate('product'); // Include product
      if (!variant) {
        return res.status(404).json({ message: 'Variant not found' });
      }
      res.json(variant);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Create a new variant for a product
  router.post('/products/:productId/variants', async (req, res) => {
    try {
      const { name, SKU, additionalCost, stockCount } = req.body; // Destructure data
      const product = await Product.findById(req.params.productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      const newVariant = new Variant({ name, SKU, additionalCost, stockCount, product });
      await newVariant.save();
  
      // Update product reference (if needed)
      product.variants.push(newVariant._id);
      await product.save();
  
      res.status(201).json(newVariant);
    } catch (error) {
      res.status(400).json({ message: error.message }); // Handle validation errors
    }
  });
  
  // Update a variant
  router.put('/products/:productId/variants/:id', async (req, res) => {
    try {
      const { name, SKU, additionalCost, stockCount } = req.body; // Destructure data
      const variant = await Variant.findByIdAndUpdate(req.params.id, { name, SKU, additionalCost, stockCount }, { new: true });
  
      if (!variant) {
        return res.status(404).json({ message: 'Variant not found' });
      }
  
      res.json(variant);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Delete a variant
  router.delete('/products/:productId/variants/:id', async (req, res) => {
    try {
      const variant = await Variant.findByIdAndDelete(req.params.id);
      if (!variant) {
        return res.status(404).json({ message: 'Variant not found' });
      }
  
      // Update product reference (if needed)
      const product = await Product.findById(req.params.productId);
      product.variants.pull(variant._id); // Remove variant from product array
      await product.save();
  
      res.json({ message: 'Variant deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  module.exports = router;
  