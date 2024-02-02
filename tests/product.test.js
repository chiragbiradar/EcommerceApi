const mongoose = require('mongoose');
const Product = require('../models/product'); // Adjust path as needed

// ... other test setup

test('Creates a product with required fields', async () => {
  const product = new Product({
    name: 'Test Product',
    description: 'A product for testing',
    price: 10.99,
  });
  await product.save();

  // Assertions about product data in the database
  expect(product).toHaveProperty('_id');
  expect(product.name).toBe('Test Product');
  // ... more assertions

  await Product.findByIdAndDelete(product._id);
});

test('Fails to create a product with missing fields', async () => {
  const product = new Product({});
  await expect(product.save()).rejects.toThrowError();
});





const request = require('supertest');
const app = require('../app'); // Adjust path as needed

// ... other test setup and mock data

test('Gets all products', async () => {
  const response = await request(app).get('/products');
  expect(response.status).toBe(200);
  expect(response.body).toBeInstanceOf(Array);
});

test('Gets a specific product', async () => {
  // Create a test product first
  const product = await createTestProduct();

  const response = await request(app).get(`/products/${product._id}`);
  expect(response.status).toBe(200);
  expect(response.body).toEqual(product);

  await Product.findByIdAndDelete(product._id);
});
