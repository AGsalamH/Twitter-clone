const router = require('express').Router();
const tweetController = require('../controllers/tweets');
const tweetActions = require('../controllers/tweetActions');
const {uploadTweet} = require('../middlewares/upload');
const {tweetValidationRules} = require('../utils/validation');
const validate = require('../middlewares/validate');
/*
    Tweet Routes:
        - GET /tweet/:tweetID
        - POST /tweet
        - DELETE /tweet
*/
router.get('/tweet/:tweetID', tweetController.getTweet);
router.post('/tweet',tweetValidationRules(), validate, uploadTweet, tweetController.createTweet);
router.delete('/tweet', tweetController.deleteTweet);


/*
    Retrieving Tweets for the Loggedin User:
        - GET /all
        - GET /retweets
        - GET /quotes
        - GET /likes
        - GET /replies
*/
router.get('/all', tweetController.getAll);
router.get('/retweets', tweetController.getAllRetweets);
router.get('/quotes', tweetController.getQuotes);
router.get('/likes', tweetController.getLikes);
router.get('/replies', tweetController.getReplies);


/*
    tweetActions Routes:
        - POST /like
        - POST /dislike
        - POST /retweet
        - POST /undo
        - POST /quote
        - POST /reply
*/
router.post('/like', tweetActions.like);
router.post('/dislike', tweetActions.dislike);

router.post('/retweet', tweetActions.retweet);
router.post('/undo', tweetActions.undo);

router.post('/quote', tweetActions.quote);
router.post('/reply', tweetActions.reply);



module.exports = router;