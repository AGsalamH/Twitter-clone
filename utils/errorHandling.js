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

// Just to throw errors in a ternary operator.
const _throw = err =>{
    throw err;
}


module.exports = {
    isMongooseError,
    jwtError,
    _throw,
    
    mongooseError
}