const ErrorHandler = require('./ErrorHandler');

const heIsFriend = (myProfile, hisProfile, myId, hisId, next) =>{

    //Im Friend?
    let ImFriend;
    hisProfile.friendList.filter((u)=>{
        ImFriend = u == myId;
    })

    //He is Friend?
    let heIsFriend;
    myProfile.friendList.filter((u)=>{
        heIsFriend = u == hisId;
    })

    if(ImFriend && heIsFriend){
        return next(new ErrorHandler('He is Already Friend', 400));
    }

}

module.exports = heIsFriend;