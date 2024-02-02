const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Optional for allowing CORS requests

const connectDB = require('./config/database');
const productRoutes = require('./routes/product.routes');
const variantRoutes = require('./routes/variant.routes');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors()); // Use cors middleware if needed

// Connect to database
connectDB();

// Routes
app.use('/products', productRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));