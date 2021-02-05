const {validationResult} = require('express-validator');

module.exports = (req, res, next) =>{
    const errors = validationResult(req);
    
    // If No Errors 
    if (errors.isEmpty()) {
        return next();
    }

    // Catch  errors!!
    
    const exractedErrors = [];
    
    errors.array().map(err=> exractedErrors.push({[err.param] : err.msg}));

    res.status(422).json({
        errors: exractedErrors
    });
}