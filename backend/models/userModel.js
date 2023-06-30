const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({

    firstName : {
        type : String,
        required : [true, "First name can't be Empty"],
        maxLength : [10, "First name can't be greater than 10 characters"]
    },
    lastName : {
        type : String,
        required : [true, "Last name can't be Empty"],
        maxLength : [10, "Last name can't be greater than 10 characters"]
    },
    avatar : {
        type : String,
        required : [true, 'Aavatar is required to signup!']
    },
    coverPic : {
        type : String,
        required : [true, 'Cover picture is required to signup!']
    },
    email : {
        type : String,
        required : [true, "Email is mandatory"],
        unique : true,
        validate : []
    },
    
    bio : {
        type : String,
        default : 'Bio'
    },
    onlineStatus : {
        type : String,
        default : 'Active Now'
    },
    blockList : [
          {
            type: mongoose.Schema.ObjectId, ref: "User", required: true
          }
    ],
    receiveBlock :[],
    sendRequest :[],
    receiveRequest :[],
    friendList : [
          {
            type: mongoose.Schema.ObjectId, ref: "User", required: true
          }
    ],
    password : {
        type : String,
        required : [true, "Password can't be Empty"],
        minLength : [3, "Password should be 8 or more than 8 characters"],
        maxLength : [18, "Password can't be more than 18 characters"],
        select : false
    },
    createdAt : {
        type : Date,
        default : Date.now
    },

});

//Generate Password Hash before save
userSchema.pre('save', async function(next){

    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);

})

//Compare Password with Hash Password
userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}

//Generate JWT Token
userSchema.methods.getJWT = function(){
    return jwt.sign({_id : this.id }, process.env.JWT_SECRET ,{expiresIn : process.env.JWT_EXPIRE})
}

//Generate Password Reset Token
userSchema.methods.getResetPasswordToken = function(){

    //Generate Token
    const resetPasswordToken = crypto.randomBytes(20).toString('hex');

    //Hashing and Adding reset password token to user Schema
    this.resetPasswordToken = crypto.createHash('sha256').update(resetPasswordToken).digest('hex');

    this.resetPasswordTokenExpire = Date.now() + 15 * 60 * 1000;

    return resetPasswordToken;

} 

const User = mongoose.model('User', userSchema);

module.exports = User;