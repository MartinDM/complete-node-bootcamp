// Define a tour model
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [ true, 'A tour name is required'],
    unique: true
  },
  duration: {
    type: Number,
    required: [ true, 'A duraton is required']
  },
  rating: {
    type: Number,
    default: 4.5
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  },
  ratingsaverage: {
    type: Number,
    default: 0
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'Specify a max group size']
  },
  difficulty: {
    type: String,
    required: [ true, 'Difficulty is required']
  },
  price:{
    type: Number,
    required: [ true, 'A price is required'] 
  },
  priceDiscount: {
    type: Number
  },
  summary: {
    type: String,
    trim: true,
    minlength: 10
  },
  description: {
    type: String,
    trim: true,
    minlength: 10
  },
  images: [String],
  imageCover: {
    type: String,
    required: [ false, 'A tour must have a cover' ]
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  createdAt2: {
    type: Date,
    default: Date.now()
  },
  startDates: {
    type: [Date]
  }
});
 

// Model definitions use caps
const Tour = mongoose.model('Tour', tourSchema);

// Default export
module.exports = Tour;
