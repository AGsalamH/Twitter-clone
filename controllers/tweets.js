const Tweet = require('../models/tweet');
const { isMongooseError, _throw } = require('../utils/errorHandling');
const { throwTweetError } = require('../utils/tweets');

const createTweet = async (req, res, next) =>{
    let imageUrl;
    try {
        if(req.file){
            imageUrl = rep.file.path;
        }
        const tweet = new Tweet({
            content: req.body.content,
            creator: req.user._id,
            imageUrl: imageUrl || null
        });
        const savedTweet = await tweet.save();
        res.status(201).json({
            msg: 'Tweet Created :)',
            tweet: savedTweet
        })
    } catch (err) {
        isMongooseError(err) ? next(err) : _throw(err);
    }
}

// Returns all Tweets and retweets for the loggedIn user 
// const getAllTweetsAndRetweets = async (req, res, next)=>{
//     try {  
//         const tweets = await Tweet.find({$or: [{creator: req.user._id}, {retweets: req.user._id} ] }).lean();
//         res.status(200).json({
//             tweets,
//         });
//     } catch (error) {
//         next(error);
//     }
// }


// Returns all Tweets, Retweets, Replies and Quotes
const getAll = async (req, res, next)=>{
    try {  
        const tweets = await Tweet.find({$or: [{creator: req.user._id }, {retweets: req.user._id}]}).lean();
        res.status(200).json({
            tweets,
        });
    } catch (err) {
        isMongooseError(err) ? next(err) : _throw(err);
    }
}


// Returns all Retweets for the loggedIn user 
const getAllRetweets = async (req, res, next)=>{
    try {  
        const tweets = await Tweet.find({retweets: req.user._id }).lean();
        res.status(200).json({
            tweets,
        });
    } catch (err) {
        isMongooseError(err) ? next(err) : _throw(err);
    }
}

// Returns certain Tweet with tweetID as a parameter
const getTweet = async (req, res, next)=>{
    const tweetID = req.params.tweetID;
    try {
        const tweet = await Tweet.findOne({_id: tweetID}).lean();
        if(!tweet){
            return throwTweetError(next);
        }
        res.status(200).json({
            tweet
        });
        
    } catch (err) {
        isMongooseError(err) ? next(err) : _throw(err);
    }
}


// Delete Tweet With ID passed in req.body
const deleteTweet = async (req, res, next)=>{
    // Make sure that this user is the creator
    const tweetID = req.body.tweetID;
    try {
        const tweet = await Tweet.findOne({_id: tweetID, creator: req.user._id});
        if (!tweet) {
            return throwTweetError(next);
        }
        const deleteCursor = await Tweet.deleteOne({_id: tweet._id});
        res.status(200).json({
            msg: 'Tweet Deleted Successfully :)',
            deleteInfo: deleteCursor,
            deletedTweet: tweet
        });
        
    } catch (err) {
        isMongooseError(err) ? next(err) : _throw(err);
    }

}
// Return all Replies for the loggedin user
const getReplies = async (req, res, next)=>{
    try {
        const replies = await Tweet.find({isReply: true, creator: req.user._id}).lean();
        res.status(200).json({
            msg: 'All replies',
            replies
        });

    } catch (err) {
        isMongooseError(err) ? next(err) : _throw(err);
    }
}

// Return all Quotes for the loggedin user
const getQuotes = async (req, res, next)=>{
    try {
        const quotes = await Tweet.find({isQuote: true, creator: req.user._id}).lean();
        res.status(200).json({
            msg: 'All Quotes',
            quotes
        });

    } catch (err) {
        isMongooseError(err) ? next(err) : _throw(err);
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
    } catch (err) {
        isMongooseError(err) ? next(err) : _throw(err);
    }
}


module.exports = {
    createTweet,

    // getAllTweetsAndRetweets,
    getAll,
    getAllRetweets,
    getTweet,

    deleteTweet,

    getQuotes,
    getReplies,

    getLikes,

}