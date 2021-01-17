const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tweetSchema = new Schema({
    content:{
        type: String,
        required: true
    },

    creator:{
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },

    // likes: {
    //     type: Number,
    //     default: 0,
    // },

    // retweets: {
    //     type: Number,
    //     default: 0,
    // },

    replies:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Tweet'
        }
    ],

    quotes:[
        {
            type: Schema.Types.ObjectId,
            ref: 'Tweet'
        }
    ],

    likes: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

    retweets: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],

    imageUrl: {
        type: String,
        default: null
    },

    isReply:{
        type: Boolean,
        default: false
    },

    isQuote:{
        type: Boolean,
        default: false
    }
},
{ timestamps: true })

// console.log(tweetSchema)
// module.exports.tweetSchema = tweetSchema;
module.exports = mongoose.model('Tweet',tweetSchema);