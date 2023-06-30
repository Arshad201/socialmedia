const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    caption : {
        type : String,
        maxLength : [1000, 'Caption cannot greater than 1000 Characters']
    }, 
    postImage: {
        type : String,
    },
    taglist: [{type: mongoose.Schema.ObjectId, ref: "User", required: true,}],
    postVisibility: { 
        type: String,
        default: 'public'
    },
    postedBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
    },
    postCreatedAt : {
        type : Date,
        default : Date.now
    }
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;