const express = require('express');
const { registerUser, login, updateProfile, deleteProfile, createUserInfo, readUserInfo, getProfile, getAllUsers, blockUser, unBlockUser, blockList, fetchNotis } = require('../controller/userControllers');
const { isAuthenticatedUser } = require('../middleware/authenticatedUser');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', login);
router.put('/update/profile', isAuthenticatedUser,  updateProfile);
router.get('/get/profile/:id', isAuthenticatedUser,  getProfile);
router.delete('/delete/profile/:password', isAuthenticatedUser,  deleteProfile);
router.post('/create/info', isAuthenticatedUser, createUserInfo);
router.get('/get/info/:id', isAuthenticatedUser, readUserInfo);
router.get('/users', isAuthenticatedUser, getAllUsers);

//Blocking
router.put('/block/:id', isAuthenticatedUser, blockUser);
router.put('/unblock/:id', isAuthenticatedUser, unBlockUser);
router.get('/blocklist/', isAuthenticatedUser, blockList);

//Notifications
router.get('/getnotis', isAuthenticatedUser, fetchNotis);

module.exports = router;