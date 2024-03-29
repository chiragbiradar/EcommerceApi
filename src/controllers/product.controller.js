const express = require('express');
//const { Product, Variant } = require('../models');
const Product = require('../models/product.model')
const Variant = require('../models/variant.model')


const router = express.Router();

// Get all products


// router.get('/', async (req, res) => {
//   try {
//     const products = await Product.find().populate('variants'); // Include variants
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// Get a specific product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('variants'); // Include variants
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new product
router.post('/', async (req, res) => {
  try {
    const { name, description, price, variants } = req.body; // Destructure data
    const newProduct = new Product({ name, description, price });

    // Create and associate variants (if provided)
    if (variants && Array.isArray(variants)) {
      const createdVariants = await Promise.all(variants.map(async (variantData) => {
        const variant = new Variant(variantData);
        variant.product = newProduct; // Set product reference
        await variant.save();
        return variant;
      }));
      newProduct.variants = createdVariants.map((v) => v._id);
    }

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: error.message }); // Handle validation errors
  }
});

// Update a product
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, variants } = req.body; // Destructure data
    const product = await Product.findByIdAndUpdate(req.params.id, { name, description, price }, { new: true });

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Update and handle variants (if provided)
    if (variants && Array.isArray(variants)) {
      // Implement logic to update existing or create new variants based on your requirements
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const { query } = req.query; // Get the search query from the URL parameters

    const regex = new RegExp(escapeRegex(query), 'i'); // Create a case-insensitive regular expression for matching

    // Search across multiple fields using $or operator
    const products = await Product.find({
      $or: [
        { name: regex },
        { description: regex },
        { 'variants.name': regex }, // Search within variants using dot notation
      ],
    }).populate('variants'); // Include variants in the results

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error searching products' });
  }
});

// Helper function to escape special characters in the query for safe regex usage
function escapeRegex(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}


function search(req, res) {
  try {
    const query = req.query.search; // Get the search query from query parameters
    const products = Product.find({
      $or: [
        { name: { $regex: query, $options: 'i' } }, // Case-insensitive search in name
        { description: { $regex: query, $options: 'i' } } // Case-insensitive search in description
      ]
    }).populate('variants');

    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}



// Delete a product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Handle deleting associated variants based on your requirements
    await Variant.deleteMany({ product: product._id }); // Example

    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
