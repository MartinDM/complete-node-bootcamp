const app = require('./app');
const mongoose = require('mongoose');
require('dotenv').config({path: './config.env'});

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

/* Example  */

// New Document as a Class 
// Has methods available on it
/* const testTour = new Tour({
  name: 'New tour 00',
  rating: 4.7,
  price: 490
})

// Save returns a promise
testTour.save().then( doc  => {
  console.log('Saved!', doc)
}).catch( err => {
  console.log('Error!', err);
}) */

const port = process.env.PORT || 3000;
app.listen(port, ()=>{
  console.log(`Running on Port ${port}`)
});