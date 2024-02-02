require('dotenv').config(); // Load environment variables from .env file

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT || 5000, // Default port if not specified
  // Add other environment variables as needed
};
