const express = require("express");
const authorizeJWT = require('../middleware/authorization');
const {createChannel, deleteChannel, verificationData, checkAdmin, countUsers} = require('../Controllers/adminController');
const Router = express.Router();

Router.get('/is-admin', authorizeJWT, checkAdmin);
Router.post('/create-channel', authorizeJWT, createChannel);
Router.post('/delete-channel', authorizeJWT, deleteChannel);
Router.get('/fetch-all-verification-data', authorizeJWT, verificationData);
Router.get('/countUsers', authorizeJWT, countUsers);

module.exports = Router;