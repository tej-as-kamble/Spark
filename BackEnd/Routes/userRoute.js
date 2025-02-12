const express = require("express");
const { signupController, loginController, logoutController, followingController, followController, verifyController} = require("../Controllers/userController");
const Router = express.Router();
const authorizeJWT = require('../middleware/authorization');

const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });


Router.post('/login', loginController);
Router.post('/logout', authorizeJWT, logoutController);
Router.post('/signup', upload.single('profileImage'), signupController);
Router.get('/fetch-following', authorizeJWT, followingController);
Router.post('/follow', authorizeJWT, followController);
Router.post('/verify-request', authorizeJWT, verifyController);

module.exports = Router;