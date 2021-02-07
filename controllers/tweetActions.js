const Tweet = require('../models/tweet');
const {isMongooseError, _throw} = require('../utils/errorHandling');
const {throwTweetError} = require('../utils/tweets');

// Like Tweet with ID sent in req.body
const like = async (req, res, next) => { 
    const tweetID = req.body.tweetID;
    try {
        const tweet = await Tweet.findById(tweetID);
        // Check if tweet exists
        if(!tweet){
            return throwTweetError(next);
        }

        // check if user already likes it
        const userIndex = tweet.likes.findIndex(v=>v.toString() === req.user._id.toString());
        if(userIndex !== -1){
            return throwTweetError(next, 'This user already likes This tweet', 400);
        }

        // Here ... Tweet Exist
        // Let's do the Like functionality
        tweet.likes.push(req.user._id);
        const likedTweet = await tweet.save();
        res.status(200).json({
            msg: 'liked (u)',
            likedTweet
        })
    } catch (err) {
        isMongooseError(err) ? next(err) : _throw(err);
    }

}

// unlike Tweet with ID sent in req.body
const dislike = async (req, res, next) => {
    const tweetID = req.body.tweetID;
    try {
        const tweet = await Tweet.findById(tweetID);
        // Check if tweet exists
        if(!tweet){
            return throwTweetError(next); 
        }
        // Here ... Tweet Exist
        // lets check if the user already likes it
        const userIndex = tweet.likes.findIndex(v=>v.toString() === req.user._id.toString());
        if(userIndex === -1){
            return throwTweetError(next, 'This user doesn\'t even like This tweet', 400);
        }

        // Let's do the dislike functionality
        tweet.likes.splice(userIndex, 1);

        const unlikedTweet = await tweet.save();
        res.status(200).json({
            msg: 'Tweet disliked (u)',
            unlikedTweet
        })        

    } catch (err) {
        isMongooseError(err) ? next(err) : _throw(err);
    }
}

// retweet Tweet with ID sent in req.body
const retweet = async (req, res, next) =>{
    const tweetID = req.body.tweetID;
    try {
        // Check if tweet exists
        const tweet = await Tweet.findById(tweetID);
        if (!tweet) {
            return throwTweetError(next); 
        }
        
        // Check if user already retweets this tweet
        const alreadyRetweeted = tweet.retweets.findIndex(v=> v.toString() === req.user._id.toString());
        if(alreadyRetweeted !== -1){
            return throwTweetError(next, 'You already retweeted this!', 400);
        }
        
        // Lets retweet
        tweet.retweets.push(req.user._id);
        const savedTweet = await tweet.save();

        res.status(200).json({
            msg: 'Retweeted :)',
            tweet: savedTweet
        })
    } catch (err) {
        isMongooseError(err) ? next(err) : _throw(err);
    }
}

// undo retweet Tweet with ID sent in req.body
const undo = async (req, res, next) =>{
    const tweetID = req.body.tweetID;
    
    try {
        // Check if tweet exists
        const tweet = await Tweet.findById(tweetID);
        if (!tweet) {
            return throwTweetError(next); 
        }
        // Here Tweet Exists ....

        //Check if user already retweets this tweet
        const userIndex = tweet.retweets.findIndex(v=> v.toString() === req.user._id.toString());
        if(userIndex === -1){
            return throwTweetError(next, 'You can\'t undo retweet this Tweet', 400); 
        }        

        // Let's undo retweet this ....
        tweet.retweets.splice(userIndex, 1);

        const savedTweet = await tweet.save();

        res.status(200).json({
            msg: 'Undo retweet :)',
            tweet: savedTweet
        });

    } catch (err) {
        isMongooseError(err) ? next(err) : _throw(err);
    }
}

// Consider u don't have a separate model for replies
const reply = async (req, res, next) =>{
    const tweetID = req.body.tweetID;
    try {
        // Check if tweet exists
        const tweet = await Tweet.findById(tweetID);
        
        if (!tweet) {
            return throwTweetError(next);
        }

        // Here Tweet Exists 
        // Lets Create new Reply
        const reply = new Tweet({
            content: req.body.content,
            creator: req.user._id,
            isReply: true
        });

        const savedReply = await reply.save();
    
        // push this reply to its replies array
        tweet.replies.push(savedReply._id);
        await tweet.save();

        // Send response
        res.status(201).json({
            msg: 'You replied Successfully ...',
            tweet: tweet,
            reply: savedReply
        });
    } catch (err) {
        isMongooseError(err) ? next(err) : _throw(err);
    }
}


// Consider u dont have a separate model for quotes
// Everythin in the Tweet model
// cuz both replies and quotes are Tweets -_-
const quote = async (req, res, next) =>{
    const tweetID = req.body.tweetID;
    try {
        // Check if tweet exists
        const tweet = await Tweet.findById(tweetID);
        if (!tweet) {
            return throwTweetError(next);
        }

        const quote = new Tweet({
            content: req.body.content,
            creator: req.user._id,
            isQuote: true
        });

        const savedQuote = await quote.save();
        tweet.quotes.push(savedQuote._id);
        const savedTweet = await tweet.save();

        res.status(201).json({
            msg: 'Tweet Quoted :)',
            tweet: savedTweet,
            quote: savedQuote
        })

    } catch (err) {
        isMongooseError(err) ? next(err) : _throw(err);
    }
}

module.exports = {
    like,
    dislike,

    retweet,
    undo,

    quote,
    reply,
}