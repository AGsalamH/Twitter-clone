const multer = require('multer');
const uniqid = require('uniqid');

//Multer options AKA upload
const tweetStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, `${process.env.DIRNAME}/public/tweets`),
    filename: (req, file, cb) => cb(null, `${uniqid('tweet-')}${file.originalname}`)
});

const avatarStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, `${process.env.DIRNAME}/public/avatars`),
    filename: (req, file, cb) => cb(null, `${uniqid('avtar-')}${file.originalname}`)
});

const fileFilter = (req, file, cb) =>{
    const filters = (
        file.mimetype === 'image/jpeg' || 
        file.mimetype === 'image/jpg'  || 
        file.mimetype === 'image/png'
    );
    if (filters) {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const uploadTweet = multer({storage:tweetStorage, fileFilter}).single('tweet');
const uploadAvatar = multer({storage:avatarStorage, fileFilter}).single('avatar');



module.exports = {
    uploadTweet,
    uploadAvatar
}