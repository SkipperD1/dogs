const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

// Error Handlers
const AppError = require('./utils/appError');
const {errorHandler} = require('./middlewares/errorHandler');

// new instance of app
const app = express();

// Body parser, reading data from the body into rq.body
app.use(bodyParser.json({limit: '25mb'}));
app.use(bodyParser.urlencoded({extended: false}));

app.use(morgan('dev'));

//Routes
const { router } = require('./routes/routes');
// use routes
app.use('/', router);

// Handling Unhandled Routes
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`,404));
});

// Global Error handling Middleware
app.use(errorHandler);

module.exports = app;