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

//verification
const verificationController = expressAsyncHandler(async (req, res) =>{
    // console.log(req.body);
    const {name, username, email, instagramLink} = req.body;
    
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
    // console.log(req.body);
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
    else{
        res.status(400).json({ message: "Admin Credentials are wrong or channel already exits." });
        throw new Error("Admin Credentials are wrong or channel already exits");
    }


});

module.exports = {loginController, signupController, verificationController, channelController};