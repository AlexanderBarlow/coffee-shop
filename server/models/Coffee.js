const mongoose = require('mongoose');

const { Schema } = mongoose;

const coffeeSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    minlength: 5,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

// Create and export the Coffee model based on the schema
const Coffee = mongoose.model('Coffee', coffeeSchema);

module.exports = Coffee;
