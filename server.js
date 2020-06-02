const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', (err) => {
    console.log('Uncaught Exception. Shuting down...');
    console.log(err);
    process.exit(1);
});

const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DB.replace('<PASSWORD>', process.env.DB_PASSWORD);

mongoose
    .connect(DB, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('DB Connection successful'));

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Running on port ${port}`);
});

process.on('unhandledRejection', (err) => {
    console.log('Unhandler Rejection. Shuting down...');
    console.log(err);
    server.close(() => {
        process.exit(1);
    });
});
