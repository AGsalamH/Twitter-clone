const router = require('express').Router();
const controller = require('./controller');
const actions = require('./actions');

const {validate, tweetValidationRules} = require('../utils/validation');

/*
    Tweet Routes:
        - GET /tweet
        - POST /tweet
        - DELETE /tweet
*/
router.get('/tweet/:tweetID', controller.getTweet);
router.post('/tweet',tweetValidationRules(), validate, controller.createTweet);
router.delete('/tweet', controller.deleteTweet);

/*
    Actions Routes:
        - POST /like
        - POST /dislike
        - POST /retweet
        - POST /undo
        - POST /quote
        - POST /reply
*/
router.post('/like', actions.like);
router.post('/dislike', actions.dislike);

router.post('/retweet', actions.retweet);
router.post('/undo', actions.undo);

router.post('/quote', actions.quote);
router.post('/reply', actions.reply);



module.exports = router;