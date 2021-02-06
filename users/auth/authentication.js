const User = require('../userModel');
const jwt=require('jsonwebtoken');
const {isMongooseError, jwtError, _throw} = require('../../utils/errorHandling');

// POST /signup
const signup = async (req, res, next) =>{
    // Required
    const {email, password, username, fullname} = req.body;

    // Optional
    const bio = req.body.bio || null;
    const city = req.body.city || null;
    let profilePictue = null;

    //Handling image upload
    if(req.file){
        profilePictue = req.file.path;
    }

    try {
        // Save the new User
        const user = new User({
            username,
            email,
            fullname,
            bio,
            city,
            profilePictue,
            password
        });
        const savedUser = await user.save();
        res.status(201).json({
            msg: 'user created successfully :)',
            userId: savedUser._id
        });        
    } catch (err) {
        isMongooseError(err) ? next(err) : _throw(err);
    }    
}


// POST /login
const login = async (req,res,next) =>{
    try {
        const user = await User.emailExists(req.body.email);
        await user.comparePassword(req.body.password);

        // Here Everything is Okay :)
        // Let's create a Token 
        const token = jwt.sign({
            email: user.email,
            username: user.username,
            _id: user._id
        },process.env.TOKEN_SECRET);
    
        //Send token to the Client in the response header
        res.header('auth-token', token);
        return res.status(200).json({msg: 'Logged in'});
        
    } catch (err) {
        isMongooseError(err) || jwtError(err) ? next(err) : _throw(err);
    }   
}

module.exports = {
    login,
    signup
}