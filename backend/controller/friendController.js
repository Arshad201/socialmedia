const catchAsyncError = require("../middleware/catchAsynErrors");
const Noti = require("../models/notiModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");
const userIsBlocked = require("../utils/heIsBlocked");
const heIsFriend = require("../utils/heIsFriend");

exports.sendFriendRequest = catchAsyncError(async (req,res, next)=>{

    const hisId = req.params.id;
    const myId = req.user.id;

    const hisProfile = await User.findById(hisId);
    const myProfile = await User.findById(myId);

    if(!hisProfile){
        return next(new ErrorHandler('Account is not found to request'));
    }

    //Check users are blocked?
    userIsBlocked(hisProfile, myId, next);

    //Check He is Already Friend!
    heIsFriend(myProfile, hisProfile, myId, hisId, next);

    //Check Friend Request is already send or not

    const iSendRequest = hisProfile.receiveRequest.includes(myId);
    const iReceiveRequest = myProfile.sendRequest.includes(hisId);

    if(iSendRequest){
        return next(new ErrorHandler('you already send a request', 400));
    }
    if(iReceiveRequest){
        return next(new ErrorHandler('You already receive a request', 400));
    }

    //Add send request in my profile
    myProfile.sendRequest.push(hisId);

    //Add request in his profile
    hisProfile.receiveRequest.push(myId);

    //Save both profiles after pushing ids to array
    await myProfile.save({validateBeforeSave: false});
    await hisProfile.save({validateBeforeSave: false});

    //If not already sended, then send Friend request to user
    const obj = {
        notiType: 'fr', //Friend request
        notiBy: [myId],
        notiMsg: `${req.user.firstName} send you a friend request`,
        notiState: 'Pending',
        notiForUser: hisId
    }

    await Noti.create(obj);

    res.status(200).json({
        success: true,
        message: 'Send request successfully!'
    })

});

exports.undoFriendRequest = catchAsyncError(async (req, res, next)=>{

    const myId = req.user.id;
    const hisId = req.params.id;

    const myProfile = await User.findById(myId);
    const hisProfile = await User.findById(hisId);

    //If his profile is not available, then send error!
    if(!hisProfile){
        return next(new ErrorHandler('Account is not available to cancel the request', 400));
    }

    //Check User is blocked!
    userIsBlocked(hisProfile, myId, next);

    //Check he is Friend
    heIsFriend(myProfile, hisProfile, myId, hisId, next);

    //Check Requests in both the profiles
    const iSendedRequestToHim = myProfile.sendRequest.includes(hisId);
    const heReceivedMyRequest = hisProfile.receiveRequest.includes(myId);

    // If not found then show the error!
    if(!iSendedRequestToHim && !heReceivedMyRequest){
        return next(new ErrorHandler('No request found!', 400));
    }

    //Remove the request from both profiles!
    const i1 = myProfile.sendRequest.indexOf(hisId); //Get index
    const i2 = hisProfile.receiveRequest.indexOf(myId); //Get index

    myProfile.sendRequest.splice(i1, 1); //Remove value from index
    hisProfile.receiveRequest.splice(i2, 1); //Remove value from index

    //Let's save both profiles after removing requests
    await myProfile.save( {validateBeforeSave: false});
    await hisProfile.save( {validateBeforeSave: false});

    //Remove his Friend request Notification
    const getHisNoti = await Noti.find({notiForUser: hisId, notiType: 'fr', notiState: 'Pending', notiBy: {$in: myId}});
    const notiId = getHisNoti[0]._id;
    await Noti.findByIdAndDelete(notiId);

    //Send Response
    res.status(200).json({
        success: true,
        message: 'Undo request!'
    })

})

exports.acceptFriendRequest = catchAsyncError(async (req, res, next)=>{

    const hisId = req.params.id;
    
    const hisProfile = await User.findById(hisId);
    const myProfile = await User.findById(req.user.id);

    if(!hisProfile){
        return next(new ErrorHandler('User is not found!', 400));
    } 

    //Remove requests from both profiles
    const isReceiveRequest = myProfile.receiveRequest.includes(hisId);
    const isSendRequest = hisProfile.sendRequest.includes(req.user.id);

    if(!isReceiveRequest || !isSendRequest){
        return next(new ErrorHandler('Request are not found!', 400));
    }

    const i1 = myProfile.receiveRequest.indexOf(hisId);
    const i2 = hisProfile.sendRequest.indexOf(req.user.id);

    myProfile.receiveRequest.splice(i1, 1);
    hisProfile.sendRequest.splice(i2, 1);


    //Check user is blocked!
    userIsBlocked(hisProfile, req.user.id, next);

    //Check he is already a friend!
    heIsFriend(myProfile, hisProfile, req.user.id, hisId, next);

    //Add friends to both profile!
    myProfile.friendList.unshift(hisId);
    hisProfile.friendList.unshift(req.user.id);


    //Update Notification
    const filteredNoti = await Noti.find({notiForUser: req.user.id, notiType: 'fr', notiState: 'Pending', notiBy: {$in: hisId}});

    if(filteredNoti.length === 0){
        return next(new ErrorHandler('No request found!', 400));
    }

    const myNoti = await Noti.findById(filteredNoti[0]._id);

    const obj = {
        notiMsg: `You accepted ${hisProfile.firstName} as a Friend!`,
        notiState: 'fullfilled',
    }

    myNoti.notiMsg = obj.notiMsg;
    myNoti.notiState = obj.notiState;
    myNoti.notiTime = Date.now();

    
    //Send Notification
    
    const notiObj = {
        notiType: 'fr', //Friend request
        notiBy: [req.user.id],
        notiMsg: `${myProfile.firstName} accept you as a friend!`,
        notiState: 'fullfilled',
        notiForUser: hisId
    }
    
    await Noti.create(notiObj);

    await myNoti.save( {validateBeforeSave: false });
    await myProfile.save( { validateBeforeSave: false });
    await hisProfile.save( { validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: `${hisProfile.firstName} is added to your friend list`
    })
    
});

exports.rejectFriendRequest = catchAsyncError(async( req, res, next)=>{

    const myId = req.user.id;
    const hisId = req.params.id;

    const myProfile = await User.findById(myId);
    const hisProfile = await User.findById(hisId);

    //If his profile is not available, then send error!
    if(!hisProfile){
        return next(new ErrorHandler('Account is not available to cancel the request', 400));
    }

    //Check User is blocked!
    userIsBlocked(hisProfile, myId, next);

    //Check he is Friend
    heIsFriend(myProfile, hisProfile, myId, hisId, next);

    //Check Requests in both the profiles
    const HeSendedRequestToMe = myProfile.receiveRequest.includes(hisId);
    const IReceivedhisRequest = hisProfile.sendRequest.includes(myId);

    // If not found then show the error!
    if(!HeSendedRequestToMe && !IReceivedhisRequest){
        return next(new ErrorHandler('No request found!', 400));
    }

    //Remove the request from both profiles!
    const i1 = myProfile.receiveRequest.indexOf(hisId); //Get index
    const i2 = hisProfile.sendRequest.indexOf(myId); //Get index

    myProfile.receiveRequest.splice(i1, 1); //Remove value from index
    hisProfile.sendRequest.splice(i2, 1); //Remove value from index

    //Let's save both profiles after removing requests
    await myProfile.save( {validateBeforeSave: false});
    await hisProfile.save( {validateBeforeSave: false});

    //Remove his Friend request Notification
    const getHisNoti = await Noti.find({notiForUser: myId, notiType: 'fr', notiState: 'Pending', notiBy: {$in: hisId}});
    const notiId = getHisNoti[0]._id;
    await Noti.findByIdAndDelete(notiId);

    //Send Response
    res.status(200).json({
        success: true,
        message: 'Request rejected!'
    })

});

exports.removeFriend = catchAsyncError(async(req, res, next)=>{


    const myId = req.user.id;
    const hisId = req.params.id;
    
    const myProfile = await User.findById(myId);
    const hisProfile = await User.findById(hisId);

    if(!hisProfile){
        return next(new ErrorHandler('User is not found!', 400));
    }

    //Check he is blocked!
    userIsBlocked(hisProfile, myId, next);

    const i1 = myProfile.friendList.indexOf(hisId);
    const i2 = hisProfile.friendList.indexOf(myId);
    
    myProfile.friendList.splice(i1, 1);
    hisProfile.friendList.splice(i2, 1);

    await myProfile.save({validateBeforeSave: false});
    await hisProfile.save({validateBeforeSave: false});

    res.status(200).json({
        success: true,
        message: `${hisProfile.firstName} unfriend successfully!`
    })

});

exports.friendList = catchAsyncError(async(req, res)=>{
 
    const myProfile = await User.findById(req.user.id).populate('friendList', 'firstName avatar');
    
    //users = Friend list
    const users = myProfile.friendList;
    res.status(200).json({
        success: true,
        users
    })

});