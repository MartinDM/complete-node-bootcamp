const express = require('express');
const router = express.Router();

// Data form local file
/* const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)) */
  
/*  Models */
const Tour = require('../models/tourModel')

/*  Controllers */

exports.createTour = (req, res) => {
  res.status(201) // 'created' status
  res.json({
    status: 'success'
  })
}

exports.getAllTours = (req, res) => {
  console.log(req.reqTime)
  res
  .status(200)
  // Follows JSend format
  .json({
    status: 'success',
    requestedAt: req.reqTime,
    data: { 
      tours 
    },
    results: tours.length
  })
}

exports.getTour = (req, res) => { 
  const tourId = parseInt(req.params.id);
  console.log(req.params)
  //const tour = tours.find( tour => tour.id === tourId );
  /* res
  .status(200)
  // Follows JSend format
  .json({
    status: 'success',
    data: {
      tour
    },
    results: 1
  }) */
}

exports.updateTour = (req, res) => { 
  res.status(200)
  // Follows JSend format
  // Patch operation here
  .json({
    status: 'success',
    data: {
      tour
    }
  });
}

exports.deleteTour = (req, res) => {
  res.status(204)
  // Follows JSend format
  // Patch operation here
  .json({
    status: 'success',
    data: null
  });
}



// Param middlware has extra argument for the param on the url
// Only runs for paths after /tours
// Prevents route handlers running if invalid id passed

// MW not needed as Mongoose adds a dynamic id
/* exports.checkId = (req, res, next, val) => {
  const tourId = parseInt(val);
  const tour = tours.find( tour => tour.id === tourId );
  if ( !tour ) {
    return res
    .status(404) // Resource not found
    .json({
      status: "fail",
      message: 'No tour exists with that ID'
    })
  }
  next();
} 

/// Example code for writing to local file
exports.createTour = (req, res) => {
  const data = req.body;
  const newId = tours[tours.length -1].id + 1;

  // Copy source object and add a property
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour) 
  // Write to server here 
  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours), ( err ) => {
      console.log(err)
      res.status(201) // 'created' status
      res.json({
        status: 'success',
        data: {
          tour: newTour
        }
      })
    });
}
*/

// Check for right data for creating tour
// Added to POST handler stack
// Mongoose Model now ensures this
/* exports.checkBody = (req, res, next) => {
  const tourData = req.body;
  if ( !tourData.price || !tourData.name ) {
    return res
    .status(400) // Bad request
    .json({
      status: "fail",
      message: 'Tour must have a name and price'
    })
  }
  next();
} */