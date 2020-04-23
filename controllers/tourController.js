const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
    try {
        //Filtering
        const queryObj = { ...req.query };
        const excludeFields = ['page', 'sort', 'limit', 'fields'];
        excludeFields.forEach((el) => delete queryObj[el]);

        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            (match) => `$${match}`
        );

        let query = Tour.find(JSON.parse(queryStr));

        //Sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(',').join(' ');
            console.log('sortBy', sortBy);
            query = query.sort(sortBy);
        } else {
            query = query.sort('-createdAt');
        }

        const tours = await query;
        res.status(200).send({
            status: 'success',
            results: tours.length,
            data: {
                tours,
            },
        });
    } catch (error) {
        res.status(404).send({
            status: 'fail',
            message: error,
        });
    }
};

exports.getTour = async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        res.status(200).send({
            status: 'success',
            data: {
                tour,
            },
        });
    } catch (error) {
        res.status(404).send({
            status: 'fail',
            message: error,
        });
    }
};

exports.createTour = async (req, res) => {
    try {
        const newTour = await Tour.create(req.body);

        res.status(201).send({
            status: 'success',
            data: {
                tour: newTour,
            },
        });
    } catch (error) {
        res.status(404).send({
            status: 'fail',
            message: error,
        });
    }
};

exports.updateTour = async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });

        res.status(200).send({
            status: 'success',
            data: {
                tour,
            },
        });
    } catch (error) {
        res.status(404).send({
            status: 'fail',
            message: error,
        });
    }
};

exports.deleteTour = async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);

        res.status(204).send({
            status: 'success',
        });
    } catch (error) {
        res.status(404).send({
            status: 'fail',
            message: error,
        });
    }
};
