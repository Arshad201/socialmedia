const ErrorHandler = require('../utils/ErrorHandler');

const errorMiddleware =(err, req, res, next)=>{

    err.statusCode = err.statusCode || 500;
    err.message = err.message || 'Internal Server Error'

    // if(err.errors){

    //     let captionMsg = "";
    //     err.errors.caption ? captionMsg = err.errors.caption.message : captionMsg = "";

    //     err.statusCode = 400;
    //     err.message = captionMsg;
    // }

     // Wrong Mongodb Id error
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    if(err.code===11000){
        err.statusCode = 400;
        err.message = 'This Email is already registered!'
    }

    res.status(err.statusCode).json({
        success : false,
        message : err.message
    })
}

module.exports = errorMiddleware;