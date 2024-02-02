const { errors } = require('celebrate'); // Assuming use of Celebrate for validation

module.exports = (err, req, res, next) => {
  if (err instanceof errors.ValidationError) {
    return res.status(400).json({ message: err.message });
  } else if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid data type' });
  } else if (err.name === 'MongoError') {
    console.error(err); // Log Mongo errors for debugging
    return res.status(500).json({ message: 'Internal server error' });
  } else {
    console.error(err); // Log other errors for debugging
    return res.status(500).json({ message: 'Something went wrong' });
  }
};
