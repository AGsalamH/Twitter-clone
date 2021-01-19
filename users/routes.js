const router = require('express').Router();
const {follow, unfollow, userInfo} = require('./controller');
const isAuth = require('./auth/isAuth');
/*
    User Routes:
        - POST /follow
        - POST /unfollow
        - GET /user
*/

router.post('/follow', follow);
router.post('/unfollow', unfollow);

// Returns the loggedin user info
router.get('/user', userInfo);

module.exports = router;