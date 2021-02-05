const router = require('express').Router();
const controller = require('./controller');
const actions = require('./actions');
const {uploadTweet} = require('../middlewares/upload');
const {tweetValidationRules} = require('../utils/validation');
const validate = require('../middlewares/validate');
/*
    Tweet Routes:
        - GET /tweet/:tweetID
        - POST /tweet
        - DELETE /tweet
*/
router.get('/tweet/:tweetID', controller.getTweet);
router.post('/tweet',tweetValidationRules(), validate,uploadTweet, controller.createTweet);
router.delete('/tweet', controller.deleteTweet);


/*
    Retrieving Tweets for the Loggedin User:
        - GET /all
        - GET /retweets
        - GET /quotes
        - GET /likes
        - GET /replies
*/
router.get('/all', controller.getAll);
router.get('/retweets', controller.getAllRetweets);
router.get('/quotes', controller.getQuotes);
router.get('/likes', controller.getLikes);
router.get('/replies', controller.getReplies);


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