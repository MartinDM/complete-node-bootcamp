const express = require('express');
const router = express.Router();

// Data form local file
/* const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)) */
  
/*  Models */
const Tour = require('../models/tourModel')

/*  Controllers */

exports.createTour = async (req, res) => {
  // const newTour = new Tour({})
  // newTour.save()
  try { 
    // Await the 
    const newTour = await Tour.create(req.body);
    // Await this variable to send in the response

    // Req.body contains the data we want
    // Adheres to Model schema
    // newTour Returns a promise 
    res.status(201) // 'created' status
    res.json({
      status: 'success',
      data: {
        tour: newTour
      }
    })
  } catch(err) {
    res.status(400) // bad request
    res.json({
      status: 'fail',
      message: err
    })
  }
};

exports.getAllTours = async (req, res) => {

  try {
    // Mongoose wrapper around 'find()' method on the DB CLI
    const tours = await Tour.find();
    res
    .status(200)
    // Follows JSend format
    .json({
      status: 'success',
      data: { 
        tours 
      },
      results: tours.length
    })
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err
    })
  }
}

exports.getTour = async (req, res) => { 
  console.log(req.params);
  try {
    const tour = await Tour.findById( req.params.id )
    // Helper method for Tour.findOne({ _id: req.params });
    // GET http://localhost:3000/api/v1/tours/5efb62cc7567863f06a2e891
    res
    .status(200)
    .json({
      status: 'success',
      data: {
        tour
      },
      results: 1
    })
  } catch (err) {
    res
    .status(404) // No found
    .json({
      status: 'fail',
      message: err
    })
  }
  //tours.find( tour => tour.id === tourId ); 
}

exports.updateTour = async (req, res) => { 
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true } ); // pass in option to return the new document not the old
    res.status(200)
    .json({
      status: 'success',
      data: {
        tour
      }
    });
  } catch (err) {
    res.status(404)
    .json({
      status: 'fail',
      message: err
    });
  }
}

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204)
    .json({
      status: 'success',
      data: null
    });
  } catch(err) {
    res.status(404)
    .json({
      status: 'fail',
      message: err
    })
  }
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