const router = require('express').Router();
const {follow, unfollow} = require('./controller');
const isAuth = require('./auth/isAuth');
/*
    User Routes:
        - POST /follow
        - POST /unfollow
*/

router.post('/follow', isAuth, follow);
router.post('/unfollow', isAuth, unfollow);

module.exports = router;