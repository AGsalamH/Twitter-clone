const User = require('../models/user');
const {isMongooseError, throwUserError, _throw} = require('../utils/errorHandling');

// Follow Functionality by sending username in req.body
const follow = async (req, res, next) =>{
    const username = req.body.username;
    try {
        // Check if the user trying to follow himself
        if (req.body.username === req.user.username) {
            const error = new Error('You Can\'t Follow or Unfollow Yourself!!!');
            error.statusCode = 400;
            return next(error);
        }

        // Check if user exists
        const user = await User.findOne({username: username});
        if (!user) {
            return throwUserError(next);
        }
        // Here..., user exists
        // Lets Check if the loggedin user is already following this user
        const loggedinUser = await User.findById(req.user._id);

        const alreadyFollowing = loggedinUser.followings.find((v,i)=> v.toString() === user._id.toString())
        
        if(alreadyFollowing){
            const error = new Error(`${req.user.username} is already following ${user.username}`);
            error.statusCode = 400;
            throw error;
        }
        // Let's add Follow functionality

        user.followers.push(req.user._id);
        loggedinUser.followings.push(user._id);

        await user.save();
        await loggedinUser.save();

        res.status(200).json({
            msg: `${req.user.username} is now following ${user.username}`
        });

    } catch (err) {
        isMongooseError(err) ? next(err) : _throw(err);
    }
}

// Unfollow
const unfollow = async (req, res, next) => {
    const username = req.body.username;
    try {
        // Check if the user trying to unfollow himself
        if (req.body.username === req.user.username) {
            const error = new Error('You Can\'t Follow or Unfollow Yourself!!!');
            error.statusCode = 400;
            return next(error);
        }

        // Check if This user exists
        const user = await User.findOne({username: username});
        if (!user) {
            return throwUserError(next);
        }

        // Here .... User exists
        // Let's Check if the loggedin user already follow this user
        const loggedinUser = await User.findById(req.user._id);
        const userIndexFollowings = loggedinUser.followings.findIndex(v=> v.toString() === user._id.toString())
        const userIndexFollowers = user.followers.findIndex(v=> v.toString() === req.user._id.toString())

        if(userIndexFollowings === -1 || userIndexFollowers == -1){
            const error = new Error(`You Don't Even Follow ${user.username} To Unfollow`);
            error.statusCode = 400;
            return next(error);
        }

        // Here .. U do follow this user
        // Let's Unfollow him
        loggedinUser.followings.splice(userIndexFollowings, 1);
        user.followers.splice(userIndexFollowers);
        await loggedinUser.save();
        await user.save();
        res.status(200).json({
            msg: `You Unfollowed ${user.username}`
        });

    } catch (err) {
        isMongooseError(err) ? next(err) : _throw(err);
    }

}

// Get user info
// Needed for Feed 
const userInfo = async (req, res, next) =>{
    try {
        const user = await User.findById(req.user._id);
        res.status(200).json({
            user
        });
    } catch (err) {
        isMongooseError(err) ? next(err) : _throw(err);
    }
}

module.exports = {
    follow,
    unfollow,
    userInfo
}