const {check} = require('express-validator');

const signupValidationRules = () => {
    return [
        check('username').isLength({min:4}).isAlphanumeric(),
        check('password').isLength({min:6}),
        check('fullname').isString().isLength({min:4}),
        check('bio').optional({nullable: true}),
        check('city').optional({nullable: true}),
        check('email').notEmpty().isEmail(),
    ]
}

const loginValidationRules = ()=>{
    return [
        check('email').notEmpty().isEmail(),
        check('password').trim().isLength({min:6})
    ]
}

const tweetValidationRules = ()=>{
    return [
        check('content', 'Can\'t be empty').isLength({min:1})
    ]
}


module.exports = {
    signupValidationRules,
    loginValidationRules,
    tweetValidationRules
}