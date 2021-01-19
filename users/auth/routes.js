const router = require('express').Router();
const {login, signup} = require('./authentication'); 
const {loginValidationRules, signupValidationRules, validate} = require('../../utils/validation')
const {uploadAvatar} = require('../../utils/upload');

/*
    Auth Routes:
        - /login
        - /signup
*/

router.post('/login', loginValidationRules(), validate, login);
router.post('/signup', signupValidationRules(), validate, uploadAvatar, signup);


module.exports = router;