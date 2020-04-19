const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const userRoutes = require('./routes/userRoutes');

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

module.exports = app;
