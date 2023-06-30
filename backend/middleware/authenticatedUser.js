const ErrorHander = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsynErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {

  const { token } = req.headers;

  if (!token) { 
    return next(new ErrorHander("Token is not Found", 401));
  }
  
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  
  req.user = await User.findById(decodedData._id);
  
  if(!req.user){
    res.status(401).json({
      success: 'false',
      message: 'Token is Expire or invalid!'
    })
  }
  next();
});