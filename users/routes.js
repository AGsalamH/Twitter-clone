const router = require('express').Router();
const {login, signup} = require('./auth/authentication'); 
const {loginValidationRules, signupValidationRules, validate} = require('../utils/validation')
/*
    Auth Routes:
        - /user/login
        - /user/signup
*/

router.post('/login', loginValidationRules(), validate, login);
router.post('/signup', signupValidationRules(), validate, signup);


module.exports = router;