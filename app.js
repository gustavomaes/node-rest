const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

const userRoutes = require('./routes/userRoutes');
const tourRoutes = require('./routes/tourRoutes');

const app = express();

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(
    bodyParser.json({
        limit: '10mb',
    })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tours', tourRoutes);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server `, 404));
});

app.use(globalErrorHandler);

module.exports = app;
