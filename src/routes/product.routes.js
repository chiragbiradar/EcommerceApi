const express = require('express');
const router = express.Router();
const search = require('../controllers/product.controller')

const productController = require('../controllers/product.controller');
// Products endpoints
router.get('/', productController);
router.get('/:id', productController);
router.post('/', productController);
router.put('/:id', productController);
router.delete('/:id', productController);
router.get('/search', search);


module.exports = router;
