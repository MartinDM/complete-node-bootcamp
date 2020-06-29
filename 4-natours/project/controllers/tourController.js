const express = require('express');
const router = express.Router();
const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`))


/*  Controllers */

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
  const tour = tours.find( tour => tour.id === tourId );
  // Could also check id against tours length
  // if tourId > tour.length
  if ( !tour ) {
    return res
    .status(404)
    .json({
      status: "fail",
      message: 'No tour of that id',
      results: 0
    })
  }
  res
  .status(200)
  // Follows JSend format
  .json({
    status: 'success',
    data: {
      tour
    },
    results: 1
  })
}

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

exports.updateTour = (req, res) => {
  const tourId = parseInt(req.params.id);
  const tour = tours.find( tour => tour.id === tourId );
  console.log(tour)
  console.log(tourId)
  if ( !tour ) {
    return res
    .status(404)
    .json({
      status: "fail",
      message: 'No tour exists with that ID'
    })
  }
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
  const tourId = parseInt(req.params.id);
  const tour = tours.find( tour => tour.id === tourId );
  console.log(tour)
  console.log(tourId)
  if ( !tour ) {
    return res
    .status(404)
    .json({
      status: "fail",
      message: 'No tour exists with that ID'
    })
  }
  res.status(204)
  // Follows JSend format
  // Patch operation here
  .json({
    status: 'success',
    data: null
  });
}