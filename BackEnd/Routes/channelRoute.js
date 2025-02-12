const express = require("express");
const {getAllMessge, addMessage, editMessage, deleteMessage, coutnMsg} = require('../Controllers/channelController');
const authorizeJWT = require('../middleware/authorization');
const Router = express.Router();

Router.get('/get-messages', getAllMessge);
Router.post('/add-message', authorizeJWT, addMessage);
Router.post('/edit-message', authorizeJWT, editMessage);
Router.post('/delete-message', authorizeJWT, deleteMessage);
Router.get('/coutnMsg', coutnMsg);

module.exports = Router;