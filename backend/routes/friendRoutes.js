const express = require('express');
const { isAuthenticatedUser } = require('../middleware/authenticatedUser');
const { sendFriendRequest, acceptFriendRequest, removeFriend, friendList, undoFriendRequest, rejectFriendRequest } = require('../controller/friendController');
const router = express.Router();

router.post('/send/friendrequest/:id', isAuthenticatedUser, sendFriendRequest);
router.post('/undo/friendrequest/:id', isAuthenticatedUser, undoFriendRequest);
router.post('/accept/friendr/:id', isAuthenticatedUser, acceptFriendRequest);
router.post('/reject/friendr/:id', isAuthenticatedUser, rejectFriendRequest);
router.post('/remove/friend/:id', isAuthenticatedUser, removeFriend);
router.get('/friendlist/', isAuthenticatedUser, friendList);

module.exports = router;
