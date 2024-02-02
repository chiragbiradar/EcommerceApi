const express = require('express');
const router = express.Router();

const productController = require('../controllers/product.controller');
// Products endpoints
router.get('/', productController);
router.get('/:id', productController);
router.post('/', productController);
router.put('/:id', productController);
router.delete('/:id', productController);
router.get('/search', productController.search);

module.exports = router;
