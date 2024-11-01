const express = require("express");
const { loginController, signupController, verificationController, channelController, verificationDataController, AllchannelController, followController, followingListController} = require("../Controllers/userController");
const Router = express.Router();


Router.post('/login', loginController);
Router.post('/signup', signupController);
Router.post('/verification', verificationController);
Router.post('/channels', channelController);

Router.get('/verification-data', verificationDataController);
Router.get('/all-channels', AllchannelController);
Router.post('/follow', followController);
Router.post('/following-list', followingListController);

module.exports = Router;