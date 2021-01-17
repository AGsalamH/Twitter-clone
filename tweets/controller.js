const Tweet = require('./models');

const createTweet = async (req, res, next) =>{
    try {
        const tweet = new Tweet({
            content: req.body.content,
            creator: req.user._id,
        });
        const savedTweet = await tweet.save();
        res.status(201).json({
            msg: 'Tweet Created :)',
            tweet: savedTweet
        })
    } catch (error) {
        next(error);
    }
}

// Returns all Tweets and retweets for the loggedIn user 
const getAllTweetsAndRetweets = async (req, res, next)=>{
    try {  
        const tweets = await Tweet.find({$or: [{creator: req.user._id}, {retweets: req.user._id} ] }).lean();
        res.status(200).json({
            tweets,
        });
    } catch (error) {
        next(error);
    }
}

// Returns all Tweets for the loggedIn user 
const getAllTweets = async (req, res, next)=>{
    try {  
        const tweets = await Tweet.find({creator: req.user._id }).lean();
        res.status(200).json({
            tweets,
        });
    } catch (error) {
        error.statusCode = 500;
        next(error);
    }
}


// Returns all Retweets for the loggedIn user 
const getAllRetweets = async (req, res, next)=>{
    try {  
        const tweets = await Tweet.find({retweets: req.user._id }).lean();
        res.status(200).json({
            tweets,
        });
    } catch (error) {
        next(error);
    }
}

// Returns certain Tweet with tweetID as a parameter
const getTweet = async (req, res, next)=>{
    const tweetID = req.params.tweetID;
    try {
        const tweet = await Tweet.findOne({_id: tweetID}).lean();
        if(!tweet){
            const error = new Error("No Tweet Found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            tweet
        });
        
    } catch (error) {
        next(error);
    }
}


// Delete Tweet With ID passed in req.body
const deleteTweet = async (req, res, next)=>{
    // Make sure that this user is the creator
    const tweetID = req.body.tweetID;
    try {
        const tweet = await Tweet.findOne({_id: tweetID, creator: req.user._id});
        if (!tweet) {
            const error = new Error('No Tweet matches this ID to Delete');
            error.statusCode = 404;
            throw error;
        }
        const deleteCursor = await Tweet.deleteOne({_id: tweet._id});
        res.status(200).json({
            msg: 'Tweet Deleted Successfully :)',
            deleteInfo: deleteCursor,
            deletedTweet: tweet
        });
        
    } catch (error) {
        next(error);
    }

}
// Return all Replies for the loggedin user
const getReplies = async (req, res, next)=>{
    try {
        const replies = await Tweet.find({isReply: true}).lean();
        res.status(200).json({
            msg: 'All replies',
            replies
        });

    } catch (error) {
        next(error);
    }
}

// Return all Quotes for the loggedin user
const getQuotes = async (req, res, next)=>{
    try {
        const quotes = await Tweet.find({isQuote: true}).lean();
        res.status(200).json({
            msg: 'All Quotes',
            quotes
        });

    } catch (error) {
        next(error);
    }
}
// Get All Tweets user likes
const getLikes = async (req, res, next)=>{
    try {
        const likes = await Tweet.find({likes: req.user._id}).lean();
        res.status(200).json({
            msg: 'All likes',
            likes
        });

    } catch (error) {
        next(error);
    }
}


module.exports = {
    createTweet,

    getAllTweetsAndRetweets,
    getAllTweets,
    getAllRetweets,
    getTweet,

    deleteTweet,

    getQuotes,
    getReplies,

    getLikes,

}