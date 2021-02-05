const router = require('express').Router();
const {login, signup} = require('./authentication'); 
const {loginValidationRules, signupValidationRules} = require('../../utils/validation');
const validate = require('../../middlewares/validate');
const {uploadAvatar} = require('../../middlewares/upload');

/*
    Auth Routes:
        - /login
        - /signup
*/

router.post('/login', loginValidationRules(), validate, login);
router.post('/signup', signupValidationRules(), validate, uploadAvatar, signup);


module.exports = router;