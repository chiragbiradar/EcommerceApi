const request = require('supertest');
const app = require('../app'); // Adjust path as needed

// ... other test setup and mock data

test('Searches for products by name', async () => {
  const response = await request(app).get('/products?name=test');
  expect(response.status).toBe(200);
  // Assertions about search results based on your implementation
});

test('Returns error for invalid search parameter', async () => {
  const response = await request(app).get('/products?invalidParam=test');
  expect(response.status).toBe(400);
  // Assertions about the error message
});
