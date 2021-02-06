const jwt = require('jsonwebtoken');
const { isMongooseError, jwtError, _throw } = require('../../utils/errorHandling');
const User = require('../userModel');

module.exports = async (req, res, next) =>{
    const token = req.get('auth-token');

    // Check if the header doesnt even exist
    if(!token){
        return res.status(401).json({msg: 'Access-denied'});
    }
    // Here There is a token
    // But let's check if it's correct
    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findById(verified._id);
        if(!user){
            const error = new jwt.JsonWebTokenError('User not found!');
            error.statusCode = 404;
            throw error;
        }
        req.user = verified;
        next();
    } catch (err) {
        isMongooseError(err) || jwtError(err) ? next(err) : _throw(err); 
    }    
}