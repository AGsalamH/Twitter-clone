const urlNotFound = (req, res, next) =>{
    const error = new Error(`URL you requested ${req.url} is NOT found on this server!`);
    error.statusCode = 404;
    throw error;
}

const globalErrorHandling = (error, req, res, next) =>{
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({
        ok: 0,
        error: error.message 
    });
}

module.exports = {
    urlNotFound,
    globalErrorHandling
}