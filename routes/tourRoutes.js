const express = require('express');
const tourController = require('../controllers/tourController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.protect, tourController.getAllTours);
router.get(
    '/top-5-cheap',
    tourController.aliasTopTours,
    tourController.getAllTours
);
router.get('/stats', tourController.getTourStats);
router.get('/monthly-plan/:year', tourController.getMonthlyPlan);
router.post('/', tourController.createTour);
router.get('/:id', tourController.getTour);
router.patch('/:id', tourController.updateTour);
router.delete('/:id', tourController.deleteTour);

module.exports = router;
