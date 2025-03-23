const expressAsyncHandler = require("express-async-handler");
const channelModel = require("../Models/channels");
const verificationModel = require("../Models/verification");
const userModel = require("../Models/user");
const verification = require("../Models/verification");

//to create a new channel
const createChannel = expressAsyncHandler(async (req, res)=>{
    const {username, isAdmin} = req.body;

    if(!isAdmin){
        res.status(400).json({ message: "Only admin can create channel" });
        throw new Error("Only admin can create channel");
    }

    if(username=="admin"){
        res.status(400).json({ message: "Admin can't create channel" });
        throw new Error("Admin can'n create channel");
    }

    const verification = await verificationModel.updateOne(
        {username},
        {channel: true}
    )
    // console.log(verification);

    const channelExits = await channelModel.findOne({username});
    if(channelExits){
        res.status(400).json({ message: "Channel already exits" });
        throw new Error("Channel already exits");
    }

    const user = await userModel.findOneAndUpdate(
        {username},
        {channel: 1}
    )

    if(user){
        const channel = await channelModel.create({username});
        if(channel){
            res.status(200).json({ message: "Channel created succesfully" });
        }
        else{
            res.status(400).json({ message: "Unable to create channel" });
            throw new Error("Unable to create channel");
        }
    }
    else{
        res.status(400).json({ message: "Unable to create channel" });
        throw new Error("Unable to create channel");
    }
});


//to delete a channel
const deleteChannel = expressAsyncHandler(async (req, res)=>{
    const {username, isAdmin} = req.body;
    // console.log(req.body);

    if(!isAdmin){
        res.status(400).json({ message: "Only admin can delete channel" });
        throw new Error("Only admin can delete channel");
    }

    const channelExits = await channelModel.findOne({username});

    if(!channelExits){
        res.status(400).json({ message: "Channel doesn't exits" });
        throw new Error("Channel doesn't exits");
    }

    const channel = await channelModel.deleteOne({username});
    const user = await userModel.updateOne(
        {username},
        {channel: -1}
    );
    const verification = await verificationModel.updateOne(
        {username},
        {channel: false}
    );
    // console.log(channel);

    if(channel && user && verification){
        res.status(200).json({ message: "Channel deleted succesfully" });
    }
    else{
        res.status(400).json({ message: "Unable to delete channel" });
        throw new Error("Unable to delete channel");
    }
});


//fetch-all-verification-data
const verificationData = expressAsyncHandler(async (req, res)=>{
    // console.log(req.query);
    const {isAdmin} = req.body;
    const {start, limit, isVerified} = req.query; 

    if (start < 0 || limit <= 0) {
        return res.status(400).json({ message: "Invalid 'start' or 'limit' parameters" });
    }

    if(!isAdmin){
        res.status(400).json({ message: "Only admin can fetch verification data" });
        throw new Error("Only admin can fetch verification data");
    }

    const verificationData =  await verificationModel.find(
        {channel: isVerified}, 
        {_id: 0, username:1, email: 1, instagramLink:1},
        { skip: start, limit: limit }
    )

    // console.log(verificationData);

    await Promise.all(verificationData.map(async (user, index) => {
        // console.log(user);
        const username = user.username;
        const getInfo = await userModel.findOne(
            { username },
            { _id: 0, name: 1, dateOfBirth: 1, profileImage: 1, channel: 1 }
        );
    
        if (getInfo) {
            verificationData[index] = {
                ...user._doc,
                name: getInfo.name || null,
                dateOfBirth: getInfo.dateOfBirth || null,
                profileImage: getInfo.profileImage || null,
                channel: getInfo.channel || false,
            };
        }
        // console.log(verificationData[index]);
    }));
    
    // console.log(verificationData);

    if(verificationData){
        res.status(200).json(verificationData);
    }
    else{
        res.status(400).json({ message: "Unable to fetch Verification Data" });
        throw new Error("Unable to fetch Verification Data");
    }
});


//to check Admin
const checkAdmin = expressAsyncHandler(async (req, res)=>{
    const {isAdmin} = req.body;
    // console.log(isAdmin);

    if(isAdmin){
        return res.status(200).json({message: "Admin"});
    }
    else{
        return res.status(401).json({message: "Not a admin"});
    }
})

// count User
const countUsers = expressAsyncHandler(async (req, res)=>{
    const {isAdmin} = req.body;
    const {reqFor} = req.query;
    // console.log(req.query);

    if(isAdmin){
        let getInfo;
        if(reqFor === 'channels'){
            getInfo = await  channelModel.find(
                {},
                { _id: 1}
            );
            // console.log(reqFor, getInfo);
        }
        else if(reqFor === 'verification'){
            getInfo = await verificationModel.find(
                {channel: false},
                { _id: 1}
            );
        }
        else{
            getInfo = await userModel.find(
                {},
                { _id: 1}
            );
        }
        // console.log(reqFor, getInfo.length);

        if(getInfo){
            return res.status(200).json({count: getInfo.length});
        }
        else{
            res.status(400).json({ message: "Unable to fetch count Data" });
            throw new Error("Unable to fetch count Data");
        }
    }
    else{
        res.status(401).json({ message: "Only admin can fetch count" });
        throw new Error("Only admin can fetch count");
    }
})


module.exports = {createChannel, deleteChannel, verificationData, checkAdmin, countUsers};