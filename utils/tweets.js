const throwTweetError = (next, message = 'Tweet not found!', status = 404) =>{
    const error = new Error(message);
    error.statusCode = status;
    return next(error);
}

module.exports = {
    throwTweetError
}