const express = require('express');
const router = express.Router();

const variantController = require('../controllers/varient.controller');

// Variants endpoints (mounted under /products/:productId)
router.get('/', variantController.getVariants);
router.get('/:id', variantController.getVariant);
router.post('/', variantController.createVariant);
router.put('/:id', variantController.updateVariant);
router.delete('/:id', variantController.deleteVariant);

module.exports = router;
