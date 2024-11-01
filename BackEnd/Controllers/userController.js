const express = require("express");
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const userModel = require("../Models/user");
const verificationModel = require("../Models/verification");
const channelModel = require("../Models/channels");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../Config/GenerateToken");

//login
const loginController = expressAsyncHandler(async (req, res) => {
    // console.log(req.body);
    const {username, password} = req.body;

    const user =  await userModel.findOne({username});
    // console.log("fechted user data: ", user);

    // console.log(await user.matchPassword(password));
    if(user && (await user.matchPassword(password))){
        const response = {
            _id : user._id,
            name : user.name,
            password: password,
            username : user.username,
            profileImage : user.profileImage,
            followingList : user.followingList,
            channelID : user.channelID,
            token : generateToken(user._id),
        }
        // console.log(response);
        res.json(response);
    }
    else{
        res.status(400).json({ message: "Invalid username or password" });
        throw new Error("Invalid username or password");
    }
});


//SignUp
const signupController = expressAsyncHandler(async (req, res) =>{
    // console.log(req.body);
    const {name, username, password} = req.body;
    
    if(!name || !username || !password){
        res.send(400);
        throw Error("All necesaary inputs field have not been fiiied.");
    }

    const userExits =  await userModel.findOne({username});
    if(userExits){
        //username is already exits
        res.status(400).json({ message: "Username not available." });
        throw new Error("Username not available.");
    }



    const user = await userModel.create({name, username, password});

    if(user){
        res.status(201).json({
            _id : user._id,
            name : user.name,
            username : user.username,
            profileImage : user.profileImage,
            followingList : user.followingList,
            channelID : user.channelID,
            token : generateToken(user._id),
        })
    }
    else {
        res.status(400).json({ message: "Failed to create an account" });
        throw new Error("Failed to create an account");
    }
});

//verification request
const verificationController = expressAsyncHandler(async (req, res) =>{
    // console.log(req.body);
    const {name, username, email, instagramLink} = req.body;

    // also take password as input and check valid user or not 
    
    if(!name || !username || !email || !instagramLink){
        res.send(400);
        throw Error("All necesaary inputs field have not been fiiied.");
    }

    const userExits =  await verificationModel.findOne({username});
    if(userExits){
        //Verification request already exits
        res.status(400).json({ message: "Your verification request is already in process." });
        throw new Error("Your verification request is already in process.");
    }



    const user = await verificationModel.create({name, username, email, instagramLink});

    if(user){
        res.status(201).json({
            message: "The verification request has been processed"
        })
    }
    else {
        res.status(400).json({ message: "Failed to make verification request." });
        throw new Error("Failed to make verification request.");
    }
});


//channels
const channelController = expressAsyncHandler(async (req, res) =>{
    console.log(req.body);
    const {name, username, adminId} = req.body;

    const admin = await userModel.findOne({ _id: new mongoose.Types.ObjectId(adminId) });
    if(admin){
        if(!name || !username){
            res.send(400);
            throw Error("All necesaary inputs field have not been fiiied.");
        }
    
        const channelExits =  await channelModel.findOne({username});
        if(channelExits){
            //channel already exits
            const user =  await userModel.findOneAndUpdate(
                {username: username},
                {channelID: channelExits._id},
                { new: true }
            );
            const verify =  await verificationModel.findOneAndUpdate(
                {username: username},
                {channelID: channelExits._id},
                { new: true }
            );
            res.status(201).json({
                message: "Channel was already created" 
            });
        }
        else{
            const channel = await channelModel.create({name, username});

            if(channel){
                const user =  await userModel.findOneAndUpdate(
                    {username: username},
                    {channelID: channel._id},
                    { new: true }
                );
                const verify =  await verificationModel.findOneAndUpdate(
                    {username: username},
                    {channelID: channel._id},
                    { new: true }
                );
                res.status(201).json({
                    message: "Channel created and channel id added to the user"
                })
            }
            else {
                res.status(400).json({ message: "Failed to create channel." });
                throw new Error("Failed to create channel.");
            }
        }
    }
    else{
        res.status(400).json({ message: "Admin Credentials are wrong or channel already exits." });
        throw new Error("Admin Credentials are wrong or channel already exits");
    }
});


//verification data
const verificationDataController = expressAsyncHandler(async (req, res) => {
    try {
        const verificationData = await verificationModel.find();
        res.status(200).json(verificationData);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving verification data", error });
    }
    
});


//all channels
const AllchannelController = expressAsyncHandler(async (req, res) => {
    try {
        const username = req.query.username;
        // console.log(username);
        let channelData;
        if (username) {
            channelData = await channelModel.findOne({ username: username }, 'name username');
            if (!channelData) {
                return res.status(404).json({ message: "No channels found for this username." });
            }
        } else {
            channelData = await channelModel.find({}, 'name username');
        }

        res.status(200).json(channelData);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error retrieving channels data", error });
    }
});

// follow-unfollow request
const followController = expressAsyncHandler(async (req, res) => {
    try {
        const { username, password, channelUsername, reqFor } = req.body;
        if (username && password) {
            const user = await userModel.findOne({ username });
            
            if (user && (await user.matchPassword(password))) {
                if (reqFor === "unfollow") {
                    await userModel.updateOne(
                        { username },
                        { $pull: { followingList: channelUsername } }
                    );
                    return res.status(200).json({ message: "Channel unfollowed successfully." });
                
                }
                else {
                    await userModel.updateOne(
                        { username },
                        { $addToSet: { followingList: channelUsername } }
                    );
                    return res.status(200).json({ message: "Channel followed successfully." });
                
                }
            } else {
                return res.status(401).json({ message: "Invalid credentials." });
            }
        } else {
            return res.status(400).json({ message: "Username or password missing." });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error updating follow status", error });
    }
});

//following list
const followingListController = expressAsyncHandler(async (req, res) => {
    try {
        const { username, password, channelUsername } = req.body;

        if (!username || !password) {
            return res.status(400).json({ message: "Username or password missing." });
        }

        const user = await userModel.findOne({ username });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: "Invalid credentials." });
        }

        if (channelUsername) {
            const isFollowing = user.followingList.includes(channelUsername);
            return res.status(200).json({ isFollowing });
        } else {
            return res.status(200).json({ followingList: user.followingList });
        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error retrieving following data", error });
    }
});

module.exports = {loginController, signupController, verificationController, channelController, verificationDataController, AllchannelController, followController, followingListController};