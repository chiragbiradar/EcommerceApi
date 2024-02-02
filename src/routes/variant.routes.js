const express = require('express');
const router = express.Router();

const variantController = require('../controllers/varient.controller');

// Variants endpoints (mounted under /products/:productId)
router.get('/', variantController);
router.get('/:id', variantController);
router.post('/', variantController);
router.put('/:id', variantController);
router.delete('/:id', variantController);

module.exports = router;
