const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: '../config.env'});
const Tour = require('../models/tourModel')

// Saved connection string in env file
const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASS);

// Options to handle deprecation warnings
// Can connect locally too
mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then( () => {
  console.log('DB connected!');
});

// Read the json file
const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours-simple.json`, 'utf-8'));

// Write to collection
const importData = async () => {
  console.log(process.env)
  try {
    await Tour.create(tours);
    console.log('Imported all data')
  } catch (err) {
    console.log(err);
  }
}

// Delete all existing data in Collection
const deleteAll = async () => {
  try {
    await Tour.deleteMany({});
    console.log('Deleted all')
  } catch (err) {
    console.log(err);
  }
}