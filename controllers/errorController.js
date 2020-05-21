const sendErrorDev = (err, res) => {
    res.status(err.statusCode).send({
        status: err.status,
        error: err,
        message: err.message,
        tack: err.stack,
    });
};

const sendErrorProduction = (err, res) => {
    if (err.operational) {
        res.status(err.statusCode).send({
            status: err.status,
            message: err.message,
        });
    } else {
        console.err('ERROR ', err);

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
        sendErrorProduction(err, res);
    }
};
