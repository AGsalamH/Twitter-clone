const Tweet = require('./tweetModel');

// Like Tweet with ID sent in req.body
const like = async (req, res, next) => { 
    const tweetID = req.body.tweetID;
    try {
        const tweet = await Tweet.findById(tweetID);
        // Check if tweet exists
        if(!tweet){
            const error = new Error('No Tweet Found');
            error.statusCode = 404;
            throw error;   
        }

        // check if user already likes it
        const userIndex = tweet.likes.findIndex(v=>v.toString() === req.user._id.toString());
        if(userIndex !== -1){
            const error = new Error('This user already likes This tweet');
            error.statusCode = 400;
            throw error;
        }

        // Here ... Tweet Exist
        // Let's do the Like functionality
        tweet.likes.push(req.user._id);
        const likedTweet = await tweet.save();
        res.status(200).json({
            msg: 'liked (u)',
            likedTweet
        })
    } catch (error) {
        next(error);
    }

}

// unlike Tweet with ID sent in req.body
const dislike = async (req, res, next) => {
    const tweetID = req.body.tweetID;
    try {
        const tweet = await Tweet.findById(tweetID);
        // Check if tweet exists
        if(!tweet){
            const error = new Error('No Tweet Found');
            error.statusCode = 404;
            throw error;   
        }
        // Here ... Tweet Exist
        // lets check if the user already likes it
        const userIndex = tweet.likes.findIndex(v=>v.toString() === req.user._id.toString());
        if(userIndex === -1){
            const error = new Error('This user doesn\'t even like This tweet');
            error.statusCode = 400;
            throw error;
        }

        // Let's do the dislike functionality
        tweet.likes.splice(userIndex, 1);

        const unlikedTweet = await tweet.save();
        res.status(200).json({
            msg: 'Tweet disliked (u)',
            unlikedTweet
        })        

    } catch(error){
        next(error);
    } 
}

// retweet Tweet with ID sent in req.body
const retweet = async (req, res, next) =>{
    const tweetID = req.body.tweetID;
    try {
        // Check if tweet exists
        const tweet = await Tweet.findById(tweetID);
        if (!tweet) {
            const error = new Error("Tweet Not Found");
            error.statusCode = 404;
            throw error;
        }
        
        // Check if user already retweets this tweet
        const alreadyRetweeted = tweet.retweets.findIndex(v=> v.toString() === req.user._id.toString());
        if(alreadyRetweeted !== -1){
            const error = new Error("You already retweeted this!");
            error.statusCode = 400;
            throw error;            
        }
        
        // Lets retweet
        tweet.retweets.push(req.user._id);
        const savedTweet = await tweet.save();

        res.status(200).json({
            msg: 'Retweeted :)',
            tweet: savedTweet
        })
    } catch (error) {
        next(error);
    }
}

// undo retweet Tweet with ID sent in req.body
const undo = async (req, res, next) =>{
    const tweetID = req.body.tweetID;
    
    try {
        // Check if tweet exists
        const tweet = await Tweet.findById(tweetID);
        if (!tweet) {
            const error = new Error("Tweet Not Found");
            error.statusCode = 404;
            throw error;
        }
        // Here Tweet Exists ....

        //Check if user already retweets this tweet
        const userIndex = tweet.retweets.findIndex(v=> v.toString() === req.user._id.toString());
        if(userIndex === -1){
            const error = new Error("You can\'t undo retweet this Tweet");
            error.statusCode = 400;
            throw error;            
        }        

        // Let's undo retweet this ....
        tweet.retweets.splice(userIndex, 1);

        const savedTweet = await tweet.save();

        res.status(200).json({
            msg: 'Undo retweet :)',
            tweet: savedTweet
        });

    } catch (error) {
        next(error);
    }
}

// Consider u don't have a separate model for replies
const reply = async (req, res, next) =>{
    const tweetID = req.body.tweetID;
    try {
        // Check if tweet exists
        const tweet = await Tweet.findById(tweetID);
        
        if (!tweet) {
            const error = new Error('Tweet you trying to reply on does NOT exist ...');
            error.statusCode = 404;
            throw error;
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
    } catch (error) {
        next(error);
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
            const error = new Error('Tweet you trying to Quote on does NOT exist ...');
            error.statusCode = 404;
            throw error;
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

    } catch (error) {
        next(error);
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