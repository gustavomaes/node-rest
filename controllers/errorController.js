const AppError = require('../utils/appError');

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {
    const value = err.errmsg.match(/(?<=")(?:\\.|[^"\\])*(?=")/);
    console.log('value> ', value);
    const message = `Duplicate field value: ${value}. Please use another value`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
    const errors = Object.values(err.errors).map((e) => e.message);
    const message = `Invalid inputdata. ${errors.join('.  ')}`;
    return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
    res.status(err.statusCode).send({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorProduction = (err, res) => {
    // console.error(err);
    if (err.isOperational) {
        res.status(err.statusCode).send({
            status: err.status,
            message: err.message,
        });
    } else {
        res.status(500).send({
            status: 'error',
            message: 'Something ent very wrong',
        });
    }
};

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
        if (error.name === 'CastError') error = handleCastErrorDB(error);
        if (error.code === 11000) error = handleDuplicateFieldsDB(error);
        if (error.name === 'ValidationError')
            error = handleValidationErrorDB(error);

        sendErrorProduction(error, res);
    }
};
