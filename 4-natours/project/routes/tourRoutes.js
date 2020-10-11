const express = require('express');
const router = express.Router();
const tourController = require('./../controllers/tourController');


router.route('/top-5-cheap')
// use middleware to change req object
.get(
  tourController.aliasTopTours,
  tourController.getAllTours
)

router.route('/') // tours
.get(tourController.getAllTours)
.post(tourController.createTour)

//router.param('id', tourController.checkId); // tours/id

router.route('/:id') // tours/id
.get(tourController.getTour).patch(tourController.updateTour)
.delete(tourController.deleteTour)

module.exports = router;