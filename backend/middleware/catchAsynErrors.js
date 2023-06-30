const catchAsyncError = (passedControllerFunc) =>(req,res,next)=>{
    Promise.resolve(passedControllerFunc(req,res,next)).catch(next);
}

module.exports = catchAsyncError;