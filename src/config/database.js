const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const URI = process.env.MONGODB_URI;
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB database connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;
