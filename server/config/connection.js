const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dbName = "Coffee-shop"

dotenv.config();

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/coffee-shop',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: dbName,
  }
);

module.exports = mongoose.connection;

