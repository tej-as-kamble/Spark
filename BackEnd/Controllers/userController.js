const express = require("express");
const userModel = require("../Models/user");
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
        throw new Error("Username not available.");
    }



    const user = await userModel.create({name, username, password});

    if(user){
        res.status(201).json({
            _id : user._id,
            name : user.name,
            username : user.username,
            token : generateToken(user._id),
        })
    }
    else {
        res.status(400);
        throw new Error("Failed to create an account");
    }
});

module.exports = {loginController, signupController};