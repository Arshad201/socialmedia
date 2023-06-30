const mongoose = require('mongoose');

const notiSchema = new mongoose.Schema({
    notiType : {
        type: String,
        required: true,
        default: null
    },
    notiBy: [
        {  
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        }
    ],
    notiMsg: {
        type: String,
        required: true
    },
    notiState: {
        type: String,
        default: null
    },
    notiForUser:{
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true, 
    },
    notiOn:{
        post:{
            type: mongoose.Schema.ObjectId,
            ref: "Post",
            default: null
        },
        comment:{
            type: mongoose.Schema.ObjectId,
            ref: "Post",
            default: null
        },
        reply:{
            type: mongoose.Schema.ObjectId,
            ref: "Post",
            default: null
        },
    },
    notiTime: {
        type: Date,
        required: true,
        default: Date.now()
    }
});

const Noti =  mongoose.model('Noti', notiSchema);
module.exports = Noti;