const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');


const userSchema = new Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    profilePictue: {
        type: String,
        default: null
    },
    bio: {
        type: String,
        default: null
    },
    city: {
        type: String,
        default: null
    },
    followings: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],

},
    { timestamps: true }
);

userSchema.pre('save', async function(next) {
    if(!this.isModified('email')){
        return next();
    }
    // Check if the email already exists 
    const user = await this.collection.findOne({email: this.email});
    if(user){
        const error = new mongoose.Error('Email Already Exists!');
        error.statusCode = 400;
        throw error;
    }
    next();
});

userSchema.pre('save', async function(next) {
    if(!this.isModified('password')){
        return next();
    }
    // Hash password Before savind it
    this.password = await bcrypt.hash(this.password, 12);
    next();
});

// To be used in login & signup functionality
userSchema.statics.emailExists = async function(email){
    const user = await this.findOne({email: email});
    if(!user){
        const error = new mongoose.Error('Email doesn\'t exist!');
        error.statusCode = 404;
        throw error;
    }
    return user;
}

// used in login
userSchema.methods.comparePassword = async function(password){
    const isCorrect = await bcrypt.compare(password, this.password);
    if(!isCorrect){
        const error = new mongoose.Error('Password isn\'t correct');
        error.statusCode = 400;
        throw error;
    }
    return isCorrect;
}


module.exports = mongoose.model('User', userSchema);
