// Define a tour model
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, 'A tour name is required'],
    unique: true
  },
  rating: {
    type: Number,
    default: 4.5
  },
  price:{
    type: Number,
    required: [ true, 'A price is required'] 
  }
});

// Model definitions use caps
const Tour = mongoose.model('Tour', tourSchema);

// Default export
module.exports = Tour;
