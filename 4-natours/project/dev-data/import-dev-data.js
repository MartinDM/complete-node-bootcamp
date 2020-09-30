const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('../models/tourModel'); 

dotenv.config({ path: '../config.env' });
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

// Read JSON
const tours = JSON.parse(fs.readFileSync(`${__dirname}/data/tours-simple.json`, 'utf-8'));

// Import the data
const importData = async () => {
  console.log(tours)
  try {
    await Tour.create(tours)
    console.log('loaded data')
    process.exit();
  } catch (err) {
  console.log(err)   
  }
}

// Delete all data fn
const deleteAllData = async () => {
  try {
    await Tour.deleteMany()
    console.log('deleting');
    process.exit();
  } catch (err) {
    console.log(err)   
  }
}

// Pass in arrgs which are added to process.argv
if ( process.argv[2] === "--import" ) {
  return importData();
} else if (  process.argv[2] === "--delete" ) {
  return deleteAllData();
}