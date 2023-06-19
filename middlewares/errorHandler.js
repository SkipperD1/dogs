const AppError = require('../utils/appError');

// Not Found Errors
const notFound = (req, res, next) => {
    const error = new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
    next(error);

};

const handleValidationErrorDB = err => {
    console.log(err);
    // Extract the field name from the error message
    const fieldNameRegex = /for column '(.*?)'/;
    const matches = err.parent.sqlMessage.match(fieldNameRegex);
    const fieldName = matches ? matches[1] : 'Unknown field';

    const errorMessage = `Invalid value for field '${fieldName}'.`;
    return new AppError(errorMessage, 400);
};



// Not Null Validation Errors
const notNull = (err, req) => {

    const missingFields = [];

    for (const field of err) {
        missingFields.push(field.path);
    }

    if (missingFields.length > 0) {
        const message = `Missing required fields: ${missingFields.join(', ')}`;
        return new AppError(message, 400);
    }

};

// Send Error
const sendError = (err, req, res) => {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            statusCode: err.statusCode,
            status: err.status,
            success: err.success,
            message: err.message
        });
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    // console.error('ERROR 💥', err);
    // 2) Send generic message
    return res.status(500).json({
        status: 'error',
        statusCode: 500,
        success: false,
        message: 'Something went very wrong!'
    });
};

// Error Handler
const errorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 400;
    let errors = { ...err };
    errors.message = err.message;

    // console.log("error from error handler: ", err);

    if (err.name === 'SequelizeValidationError') errors = notNull(errors.errors, req);
    if (err.name === 'SequelizeDatabaseError' && err.parent.code === 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD') errors = handleValidationErrorDB(errors);

    // sending error to users
    sendError(errors, req, res);
};

module.exports = { notFound, errorHandler };