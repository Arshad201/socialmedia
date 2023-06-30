const catchAsyncError = require("../middleware/catchAsynErrors");
const Noti = require("../models/notiModel");
const UserInfo = require("../models/userInfoModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler.js");
const userIsBlocked = require("../utils/heIsBlocked");
const sendToken = require("../utils/jwtToken");

exports.registerUser = catchAsyncError(async(req,res,next)=>{

    const { firstName, lastName, email, password, confirmPassword, avatar, coverPic } = req.body;

    if(password !== confirmPassword){
        return next(new ErrorHandler('Password and Confirm password does not matched!', 400));
    }

    const user = await User.create({firstName, lastName, email, password, avatar, coverPic});

    sendToken(user, 201, res);

})

exports.login = catchAsyncError(async(req, res, next)=>{
    
    const {email, password} = req.body;

    const user = await User.findOne({email}).select("+password");

    if(!user){
        return next(new ErrorHandler('Wrong credentials!', 401))
    }

    const comparePassword = await user.comparePassword(password)

    if(!comparePassword){
        return next(new ErrorHandler('Wrong credentials!', 401));
    }

    sendToken(user, 201, res);

})

exports.getProfile = catchAsyncError(async(req, res, next)=>{


    const user = await User.findById(req.params.id);
    
    if(!user){
        return next(new ErrorHandler(`Account is not found with this ${req.params.id}`));
    }

    userIsBlocked(user, req.user.id, next);

    res.status(200).json({
        user
      });

});

exports.updateProfile = catchAsyncError(async(req, res, next)=>{

    const email = req.user.email;
    const user = await User.findOne({email});

    if(!user){
        return next(new ErrorHandler(`Account is not found with this ${email}`));
    }

    const updatedUser = await User.findByIdAndUpdate(user._id, req.body, {new:true, runValidators:true, useFindAndModify:true })

    res.status(200).json({
        success: true,
        updatedUser,
      });

});

exports.deleteProfile = catchAsyncError(async(req, res, next)=>{

    const email = req.user.email;
    const user = await User.findOne({email}).select('+password');
    if(!user){
        return next(new ErrorHandler(`Account is not found with this ${email}`));
    }

    const comparePassword = await user.comparePassword(req.params.password)

    if(!comparePassword){
        return next(new ErrorHandler('Password is wrong!', 401));
    }

    await User.findByIdAndDelete(user._id);

    res.status(200).json({
        success: true,
        message: 'Account delete successfull!'
      });

});

exports.createUserInfo = catchAsyncError(async(req, res)=>{

    const findUserInfo = await UserInfo.findOne({userFor: req.user.id});
    let userInfo;

    if(findUserInfo){
        userInfo = await UserInfo.findByIdAndUpdate(findUserInfo._id, req.body, {new:true, runValidators:true, useFindAndModify:true });
    }else{
        const bodyData = {...req.body, userFor:req.user.id}
        userInfo = await UserInfo.create(bodyData);
    }

    res.status(201).json({
        success: true,
        userInfo
    })

});

exports.readUserInfo = catchAsyncError(async(req, res)=>{

    const userInfo = await UserInfo.findOne({userFor: req.params.id});

    res.status(200).json({
        userInfo
    })

});

exports.getAllUsers = catchAsyncError(async(req, res, next)=>{

    const myProfile = await User.findById(req.user.id);
    const myBlockList = myProfile.blockList;
    const recievedBlocked = myProfile.receiveBlock;

    const users = await User.find(
        
        {
            $nor: [
              { _id: { $in: myBlockList } },         // Exclude blocked users as senders
              { _id: { $in: req.user.id } },         // Exclude blocked users as senders
              { _id: { $in: recievedBlocked } }   // Exclude blocked users as receivers
            ]
        }
        
    );

    if(!users){
        return next(new ErrorHandler(`Account is not found with this ${req.params.id}`));
    }

    res.status(200).json({
        users
      });

});

//Blocking
exports.blockUser = catchAsyncError(async(req, res, next)=>{
 
    const myProfile = await User.findById(req.user.id);
    const hisProfile = await User.findById(req.params.id);
    
    if(!hisProfile){
        return next(new ErrorHandler('Profile of this user is not longer!'));
    }

    // Check User is blocked already!

    const blockUser = myProfile.blockList.filter((u)=>{
        return u == req.params.id
    })

    if(blockUser.length > 0){
        return next(new ErrorHandler('User is already blocked!', 400));
    }
    
    //Remove Friend in both the profiles

    const fitlerMyFriend = myProfile.friendList.filter((u)=>{
        return u != req.params.id;
    })

    const fitlerHisFriend = hisProfile.friendList.filter((u)=>{
        return u != req.user.id;
    })

    myProfile.friendList = fitlerMyFriend;
    hisProfile.friendList = fitlerHisFriend;

    //Add Blocked users to My Profile
    myProfile.blockList.unshift(req.params.id);

    //Receive Blocked to hisProfile
    hisProfile.receiveBlock.push(req.user.id);

    await myProfile.save( {validateBeforeSave: false} );
    await hisProfile.save( {validateBeforeSave: false} );

    res.status(200).json({
        success: true,
        myProfile,
        message: 'User blocked successfully!'
    })

});
exports.unBlockUser = catchAsyncError(async(req, res, next)=>{
 
    const myProfile = await User.findById(req.user.id);
    const hisProfile = await User.findById(req.params.id);

    if(!hisProfile){
        return next(new ErrorHandler('User is not found to unblock', 400));
    }
    
    //Remove From BlockList
    const indexB = myProfile.blockList.indexOf(req.params.id);
    myProfile.blockList.splice(indexB, 1);

    //Remove Receive block from his profile
    let index = hisProfile.receiveBlock.indexOf(req.user.id);
    hisProfile.receiveBlock.splice(index, 1);

    await myProfile.save( {validateBeforeSave: false} );
    await hisProfile.save( {validateBeforeSave: false} );
    
    res.status(200).json({
        success: true,
        users: myProfile.blockList
    })

});
exports.blockList = catchAsyncError(async(req, res)=>{
 
    const myProfile = await User.findById(req.user.id).populate('blockList', 'firstName avatar');
    
    //users = Block list
    const users = myProfile.blockList;
    res.status(200).json({
        success: true,
        users
    })

});

//Notifications
exports.fetchNotis = catchAsyncError(async(req, res)=>{
 
    const myProfile = await User.findById(req.user.id);

    let blockedList = myProfile.blockList.map(u => u.userId);

    blockedList = [...myProfile.receiveBlock, ...blockedList];

    let notis = await Noti.find({ notiForUser: req.user.id }).sort({notiTime: -1});
    
    res.status(200).json({
        success: true,
        myId: req.user.id,
        notis
    })
});