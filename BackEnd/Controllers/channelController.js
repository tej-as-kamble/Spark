const expressAsyncHandler = require("express-async-handler");
const channelModel = require("../Models/channels");
const userModel = require("../Models/user");


// fetch all channel list
const fetchAllchannelController = expressAsyncHandler(async (req, res) =>{
    // console.log(req.query);
    const {channel, start, limit} = req.query;

    if(channel){
        const getInfo = await userModel.findOne(
            { username: channel },
            { _id: 0, name: 1, username: 1, profileImage: 1, channel: 1}
        );
        // console.log(getInfo);

        if(getInfo && getInfo.channel){
            return res.status(201).json(getInfo);
        }
        else{
            return res.status(400).json({ message: "Channel NOT found." });
        }
    }

    if (start < 0 || limit <= 0) {
        return res.status(400).json({ message: "Invalid 'start' or 'limit' parameters" });
    }

    const channels =  await channelModel.find(
        {}, 
        {_id: 0, username: 1, CountMsg: 1 },
        { skip: start, limit: limit }
    )

    // console.log(channels);

    await Promise.all(channels.map(async (user, index) => {
        // console.log(user);
        const username = user.username;
        const getInfo = await userModel.findOne(
            { username },
            { _id: 0, name: 1, dateOfBirth: 1, profileImage: 1, channel: 1 }
        );
    
        if (getInfo) {
            channels[index] = {
                ...user._doc,
                name: getInfo.name || "No Name",
                profileImage: getInfo.profileImage || null,
                channel: getInfo.channel || false,
            };
        }
        // console.log(channels[index]);
    }));

    if(channels){
        return res.status(200).json(channels);
    }
    else{
        res.status(400).json({ message: "Unable to fetch channels" });
        throw new Error("Unable to fetch channels");
    }
});





//get all msg of chennel
const getAllMessge = expressAsyncHandler(async (req, res) => {
    // console.log(req.query);
    const { username, start, limit } = req.query;

    const parseStart = parseInt(start, 10);
    const parseLimit = parseInt(limit, 10);

    if (parseStart < 0 || parseLimit <= 0) {
        return res.status(400).json({ message: "Invalid 'start' or 'limit' parameters" });
    }
        
    const channel = await channelModel.findOne(
        { username: username },
        { Message: { $slice: [parseStart, parseLimit] } }
    );

    // console.log(channel);
    
    if (channel) {
        // console.log(channel.Message);
        const messages = channel.Message;
        // const countMsg = channel.CountMsg;
        res.json(messages);
    } else {
        res.status(404).json({ message: "Channel NOT found" });
    }
});



//To add new msg
const addMessage = expressAsyncHandler(async (req, res) => {
    // console.log(req.body);
    const { username, msg } = req.body; // `username` is channel name

    if (!username || !msg) {
        return res.status(400).json({ message: "Invalid user" });
    }

    try {
        // Store message in MongoDB and return `_id` and `createdAt`
        const result = await channelModel.findOneAndUpdate(
            { username },
            { 
                $push: { Message: { content: msg, createdAt: new Date() } },
                $inc: { CountMsg: 1 }
            },
            { new: true, projection: { "Message": { $slice: -1 } } } // Get only the last inserted message
        );

        if (result && result.Message.length > 0) {
            const newMessage = result.Message[0]; // Get latest message
            const messageToSend = {
                _id: newMessage._id,
                content: newMessage.content,
                createdAt: newMessage.createdAt,
                username: username,
            };

            // console.log(messageToSend);
            req.io.emit("receiveMessage", messageToSend);

            return res.status(201).json({
                message: "Message added successfully",
                newMessage: messageToSend,
            });
        } else {
            return res.status(400).json({ message: "Unable to send message or channel does not exist" });
        }
    } catch (err) {
        console.error("Error saving message:", err);
        return res.status(500).json({ message: "An error occurred", error: err.message });
    }
});

//edit msg
const editMessage = expressAsyncHandler(async (req, res)=>{
    // console.log(req.body);
    const {username, _id, editedMsg} = req.body;
    
    if(username && _id){
        try{
            const result = await channelModel.updateOne(
                { username, "Message._id": _id },
                { $set: { "Message.$.content": editedMsg } }
            );

            if (result.modifiedCount > 0) {
                res.status(201).json({
                    message: 'Message edited successfully',
                });
            } else {
                res.status(400).json({
                    message: 'Message not found or no changes made',
                });
            }
        }
        catch(err){
            res.status(400).json({
                message: 'An error occurred',
                error: err.message,
            });
        }
    }
    else{
        res.status(400).json({ message: "Invalid user" });
        throw new Error("Invalid user");
    }
});


//delete msg
const deleteMessage = expressAsyncHandler(async (req, res)=>{
    // console.log(req.body);
    const {username, _id} = req.body;
    if(username && _id){
        try{
            const result = await channelModel.updateOne(
                { username, "Message._id": _id },
                { 
                    $pull: { Message: { _id } },
                    $inc: { CountMsg: -1 }
                }
            );

            // console.log(result);

            if (result.modifiedCount > 0) {
                res.status(201).json({
                    message: 'Message deleted successfully',
                });
            } else {
                res.status(400).json({
                    message: 'Message not found or no changes made',
                });
            }
        }
        catch(err){
            res.status(400).json({
                message: 'An error occurred',
                error: err.message,
            });
        }
    }
    else{
        res.status(400).json({ message: "Invalid user" });
        throw new Error("Invalid user");
    }
});

// coutnMsg
const coutnMsg = expressAsyncHandler(async (req, res) => {
    // console.log(req.query);
    const {username} = req.query;
        
    const count = await channelModel.findOne(
        { username: username },
        { _id:0, CountMsg: 1}
    );

    // console.log(count);
    
    if (count?.CountMsg>=0) {
        res.json(count);
    } else {
        res.status(404).json({ message: "Channel NOT found" });
    }
})

module.exports = {fetchAllchannelController, getAllMessge, addMessage, editMessage, deleteMessage, coutnMsg};