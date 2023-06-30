const sendToken = (user, statusCode, res)=>{
    const token = user.getJWT();

    res.status(statusCode).json({
        token,
        id: user._id
    });

}

module.exports = sendToken;