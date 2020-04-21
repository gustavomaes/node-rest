const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

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

module.exports = app;
