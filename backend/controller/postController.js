const catchAsyncError = require("../middleware/catchAsynErrors");
const Post = require("../models/postModel");
const User = require("../models/userModel");
const ErrorHandler = require("../utils/ErrorHandler");

 exports.createPost = catchAsyncError(async(req, res, next)=>{

    const { caption, postImage, postVisibility, taglist } = req.body;

    if(!caption && !postImage){
        return next(new ErrorHandler('Upload Image or add a caption!'));
    }

    await Post.create({caption, postImage, postVisibility, taglist, postedBy: req.user.id});

    res.status(201).json({
        success: true,
        message: 'Post is created!'
    })

 })
 exports.updatePost = catchAsyncError(async(req, res, next)=>{

     const postId = req.params.id;
    const { caption } = req.body;

    const findPost = await Post.findById(postId);

    if(!findPost.postImage){
        if(!caption){
            return next(new ErrorHandler('Caption should not be empty'));
        }
    }

    findPost.caption = caption;

    await findPost.save({validateBeforeSave: false});

    res.status(201).json({
        success: true,
        message: 'Post is updated!'
    })

 })
 exports.deletePost = catchAsyncError(async(req, res)=>{

    const postId = req.params.id;

    await Post.findByIdAndDelete(postId);

   res.status(201).json({
       success: true,
       message: 'Post deleted!'
   })

})
exports.getAllPost = catchAsyncError(async (req, res, next)=>{

    const myProfile = await User.findById(req.user.id);
    
    const blockedList = [...myProfile.blockList, ...myProfile.receiveBlock];


    //Filter tagList based on blockList
    //Filter posts based on blockList

    const posts = await Post.find({postedBy: {$nin: blockedList}}).sort({ postCreatedAt: -1 }).populate('postedBy', 'firstName avatar'); 

    res.status(200).json({
        success: true,
        posts
    })
})