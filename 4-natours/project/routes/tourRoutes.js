const express = require('express');
const router = express.Router();
const tourController = require('./../controllers/tourController');


router.route('/') // tours
.get(tourController.getAllTours)
.post(tourController.checkBody, tourController.createTour)

router.param('id', tourController.checkId); // tours/id

router.route('/:id') // tours/id
.get(tourController.getTour).patch(tourController.updateTour)
.delete(tourController.deleteTour)

module.exports = router;