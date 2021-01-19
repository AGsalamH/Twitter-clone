const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

module.exports = mongoose.model('User', userSchema);