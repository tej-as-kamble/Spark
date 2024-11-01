const express = require("express");
const { loginController, signupController, verificationController, channelController } = require("../Controllers/userController");
const channels = require("../Models/channels");
const verification = require("../Models/verification");
const Router = express.Router();


Router.post('/login', loginController);
Router.post('/signup', signupController);
Router.post('/verification', verificationController);
Router.post('/channels', channelController);

Router.get('/verification-data', async (req, res) => {
    try {
        const verificationData = await verification.find();
        res.status(200).json(verificationData);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving verification data", error });
    }
});

module.exports = Router;