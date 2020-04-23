const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

router.get('/', tourController.getAllTours);
router.get(
    '/top-5-cheap',
    tourController.aliasTopTours,
    tourController.getAllTours
);
router.post('/', tourController.createTour);
router.get('/:id', tourController.getTour);
router.patch('/:id', tourController.updateTour);
router.delete('/:id', tourController.deleteTour);

module.exports = router;
