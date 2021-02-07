const mongooseError = require('mongoose').Error;

// Check if it's a mongoose related error 
// To help me catch mongoose errors only
const isMongooseError = err => err instanceof mongooseError;

// Check if it's a Jsonwebtoken error
const jwtError = err => {
    const filter = (
        err.name === 'JsonWebTokenError' ||
        err.name === 'NotBeforeError'    ||
        err.name === 'TokenExpiredError'
    );
    return filter;
}

const throwTweetError = (next, message = 'Tweet not found!', status = 404) =>{
    const error = new Error(message);
    error.statusCode = status;
    return next(error);
}

const throwUserError = (next, message = 'User not found!', status = 404) =>{
    const error = new Error(message);
    error.statusCode = status;
    return next(error);
}


// Just to throw errors in a ternary operator.
const _throw = err =>{
    throw err;
}


module.exports = {
    isMongooseError,
    jwtError,
    _throw,

    throwTweetError,
    throwUserError,
    
    mongooseError
}