const express = require('express');
const { isAuthenticatedUser } = require('../middleware/authenticatedUser');
const { createPost, updatePost, deletePost, getAllPost } = require('../controller/postController');
const router = express.Router();

router.post('/create/post', isAuthenticatedUser, createPost);
router.put('/update/post/:id', isAuthenticatedUser, updatePost);
router.delete('/delete/post/:id', isAuthenticatedUser, deletePost);
router.get('/get/posts', isAuthenticatedUser, getAllPost);

module.exports = router;