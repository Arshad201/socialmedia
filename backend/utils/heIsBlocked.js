const ErrorHandler = require('./ErrorHandler');

const userIsBlocked = (hisProfile, myId, next) =>{

    //Im Blocked?
    let ImBlocked;
    hisProfile.blockList.filter((u)=>{
        ImBlocked = u == myId;
    })

    //He is Blocked?
    let heIsBlocked;
    hisProfile.receiveBlock.filter((u)=>{
        heIsBlocked = u == myId;
    })

    if(ImBlocked || heIsBlocked){
        return next(new ErrorHandler('something went wrong', 400));
    }

}

module.exports = userIsBlocked;