## Node.js E-commerce API

This repository implements a Node.js-based API for an e-commerce application, providing functionalities for managing products, variants, and searching.

**Key Features:**

- **CRUD Operations:** Create, read, update, and delete products and variants.
- **Searching:** Search products by name, description, or variant name for flexible querying.
- **MongoDB Integration:** Leverages MongoDB for data persistence and efficient product retrieval.
- **Modular Design:** Organized code structure for maintainability and scalability.
- **Error Handling:** Includes comprehensive error handling to provide informative responses.

**Installation:**

1. Clone this repository: `git clone https://github.com/your-username/node-js-e-commerce-api.git`
2. Install dependencies: `npm install`

**Environment Variables:**

1. Create a `.env` file in the project root directory.
2. Add the following variables:
   - `MONGODB_URI`: Your MongoDB connection URI.
   - `PORT`: The port on which the server will listen (default: 5000).

**Running the API:**

1. Start the server: `npm start`

**API Endpoints:**

| Endpoint                 | Method | Description                                              |
|-------------------------|-------|-----------------------------------------------------------|
| `/products`              | GET   | Retrieves all products.                                 |
| `/products/:id`          | GET   | Retrieves a specific product by its ID.                |
| `/products`              | POST  | Creates a new product.                                  |
| `/products/:id`          | PUT   | Updates an existing product.                             |
| `/products/:id`          | DELETE| Deletes a product.                                        | 
| `/products/search`       | GET   | Searches for products by name, description, or variant name. |

**Example Usage:**

**Retrieve all products:**

```bash
curl http://localhost:5000/products
```

**Create a new product:**

```bash
curl -X POST http://localhost:5000/products -H "Content-Type: application/json" -d '{"name": "Awesome T-Shirt", "description": "A comfortable and stylish t-shirt", "price": 19.99, "variants": [{"name": "Small", "SKU": "TSHIRT-S-001", "additionalCost": 0, "stockCount": 100}, {"name": "Medium", "SKU": "TSHIRT-M-002", "additionalCost": 0, "stockCount": 80}, {"name": "Large", "SKU": "TSHIRT-L-003", "additionalCost": 0, "stockCount": 50}]}'
```

**Search products by name:**

```bash
curl http://localhost:5000/products/search?query=shirt
```

