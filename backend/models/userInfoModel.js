const mongoose = require('mongoose');

const userInfoSchema = new mongoose.Schema({

    works : [
        {
            name: {type: String, default:''},
            desc: {type: String, default:''},
            startDate: {type: Date, required:true, default:''},
            endDate: {type: Date, default:''}
        }
    ],
    school : [
        {
            name: {type: String, default:''},
            desc: {type: String, default:''},
            startDate: {type: Date, required:true, default:''},
            endDate: {type: Date, default:''}
        }
    ],
    college : [
        {
            name: {type: String, default:''},
            desc: {type: String, default:''},
            startDate: {type: Date, required:true, default:''},
            endDate: {type: Date, default:''}
        }
    ],

    personalInfo: {

        currentCity : {type : String, default:''},
        homeTown : {type : String, default:''},
        relationship : {type : String, default:''},
    },
    
    socialLinks: [{
        name : {type : String, default:''},
        url : {type : String, default:''}
    }],

    userFor : {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    }
    
});

const UserInfo =  mongoose.model('UserInfo', userInfoSchema);
module.exports = UserInfo;