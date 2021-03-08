// Node process.env now has the keys and values in .env file
const express = require('express');
const app = express();
const fs = require('fs');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

app.set('view-engine', 'pug');
app.set('views', './views');
/* Middleware
   Define at the start of the req/response cycle
*/

// Add body data to req object
if( process.env.NODE_ENV === 'development' ) {
  // Allow logger only in dev mode
  app.use(morgan('dev'))
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use( (req, res, next) => {
  next();
});

// Add a requestedAt middleware time
app.use( (req, res, next) => {
  req.reqTime = new Date().toISOString();
  next();
})

app.get('/', (req, res) => {
  res
  .status(200)
  .json({
    status: 'success',
    message: 'API'
  })
})

/* Mount Routes
 'Sub' applications */
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
  
// Longer format
// app.post('/api/v1/tours', createTour)
// app.patch('/api/v1/tours/:id', updateTour)
// app.post('/api/v1/tours', createTour)

// Good practice to export the Server itself separately
module.exports = app;