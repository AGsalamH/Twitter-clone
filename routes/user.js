const router = require('express').Router();
const {follow, unfollow, userInfo} = require('../controllers/users');
const isAuth = require('../middlewares/isAuth');
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