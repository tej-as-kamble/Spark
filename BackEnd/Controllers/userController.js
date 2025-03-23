const userModel = require("../Models/user");
const followingModel = require("../Models/following");
const verificationModel = require("../Models/verification");
const channelModel = require("../Models/channels");
const expressAsyncHandler = require("express-async-handler");
const generateToken = require("../Config/GenerateToken");



//SignUp
const signupController = expressAsyncHandler(async (req, res) =>{
    // console.log(req.body);
    const {name, dateOfBirth, username, password} = req.body;
    
    if(!name || !dateOfBirth || !username || !password){
        res.status(400).json({ message: "All necesaary inputs field have not been fiiied." });
        throw Error("All necesaary inputs field have not been fiiied.");
    }

    const userExits =  await userModel.findOne({username});
    if(userExits){
        //username is already exits
        res.status(400).json({ message: "Username not available." });
        throw new Error("Username not available.");
    }

    let profileImage = "";
    if (req.file) {
        // console.log(req.file);
        profileImage = req.file.buffer.toString("base64"); // Convert image to Base64
    }

    const user = await userModel.create({name, dateOfBirth, username, password, profileImage});
    const following = await followingModel.create({username});

    if(user && following){
        const response = {
            name : user.name,
            username : user.username,
            profileImage : user.profileImage,
            channel : user.channel,
            token : generateToken(user.username),
        }
        // console.log(response);
        res.cookie('token', response.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        return res.json(response);
    }
    else {
        res.status(400).json({ message: "Failed to create an account" });
        throw new Error("Failed to create an account");
    }
});



//login
const loginController = expressAsyncHandler(async (req, res) => {
    // console.log(req.body);
    const {username, password} = req.body;

    const user =  await userModel.findOne({username});
    // console.log(user);

    // console.log(await user.matchPassword(password));
    if(user && (await user.matchPassword(password))){
        const response = {
            name : user.name,
            username : user.username,
            profileImage : user.profileImage,
            channel : user.channel,
            token : generateToken(user.username),
        }
        // console.log(response);
        res.cookie('token', response.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });
        return res.json(response);
    }
    else{
        res.status(400).json({ message: "Invalid username or password" });
        throw new Error("Invalid username or password");
    }
});


//logout
const logoutController = expressAsyncHandler(async (req, res)=>{
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ message: 'Already logout' });
    }

    res.clearCookie('token')
    res.json({ message: 'Logout successful!' });
});


//Fetch following
const followingController = expressAsyncHandler(async (req, res) =>{
    // console.log(req.body);
    const {username} = req.body;
    // console.log(req.query);
    const {channel, start, limit} = req.query;

    if(channel){
        const isFollowing =  await followingModel.findOne(
            {username, followingList: channel},
            {_id: 1}
        );

        // console.log(!!isFollowing);

        if(isFollowing){
            return res.status(200).json(!!isFollowing);
        }
        else{
            return res.status(200).json(!!isFollowing);
        }
    }

    const following =  await followingModel.findOne(
        {username},
        {followingList: {$slice: [Number(start), Number(limit)]}}
    );
    // console.log(following);

    let response=[];

    if(following){    
        await Promise.all(following.followingList.map(async (username, index) => {
            // console.log(username);

            const getInfo = await userModel.findOne(
                { username },
                { _id: 0, name: 1, username: 1, profileImage: 1, channel: 1 }
            );
            // console.log(getInfo);

            if(getInfo){
                const channel =  await channelModel.findOne({username}, {_id: 0, CountMsg: 1 })
                // console.log(channel);

                if(channel){
                    const info ={
                        name: getInfo.name || "Spark User",
                        username: username || "sparkuser",
                        profileImage: getInfo.profileImage || null,
                        channel: getInfo.channel || false,
                        CountMsg: channel.CountMsg || 0
                    }
                    // console.log(info);
                
                    if (info) {
                        response = [
                            ...response,
                            info
                        ];
                    }
                }
            }
        }));
    }

    // console.log(response);

    if(response){
        res.status(200).json(response);
    }
    else{
        res.status(400).json({ message: "Unable to fetch follwing" });
        throw new Error("Unable to fetch follwing");
    }
});


// follow-unfollow request
const followController = expressAsyncHandler(async (req, res) => {
    const { username, channelUsername, reqFor} = req.body;
    // console.log(req.body);

    const user = await followingModel.findOne({username}, {_id:0,  username:1});
    // console.log(user);
    if (user) {
        const channel = await channelModel.findOne({username: channelUsername}, {_id:0,  username:1});
        // console.log(channel);
        if(channel){
            if (reqFor === "unfollow") {
                const response = await followingModel.updateOne(
                    { username },
                    { $pull: { followingList: channelUsername } }
                );

                if(response)
                    res.status(201).json({ message: "Channel unfollowed successfully." });
                else
                    res.status(400).json({ message: "Unable to unfollow a channel." });
            }
            else {
                const response = await followingModel.updateOne(
                    { username },
                    { $addToSet: { followingList: channelUsername } }
                );
                // console.log(response);

                if(response)
                    res.status(201).json({ message: "Channel followed successfully." });
                else
                res.status(400).json({ message: "Unable to follow a channel." });
            }
        }
        else{
            res.status(200).json({ message: "Channel not found." });
        }
    } else {
        return res.status(401).json({ message: "Invalid user" });
    }
});


//request for verification
const verifyController = expressAsyncHandler(async (req, res)=>{
    // console.log(req.body);
    const {username, email, instagramLink, isAdmin} = req.body;

    if(isAdmin){
        res.status(400).json({ message: "Admin can't request for verification" });
        throw new Error("Admin can't request for verification");
    }

    if(!username || !email || !instagramLink){
        res.send(400);
        throw Error("All necesaary inputs field have not been fiiied.");
    }

    const userExits =  await verificationModel.findOne({username});
    if(userExits){
        //Verification request already exits
        res.status(400).json({ message: "Your verification request is already in process." });
        throw new Error("Your verification request is already in process.");
    }



    const user = await verificationModel.create({username, email, instagramLink});

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


module.exports = {signupController, loginController, logoutController, followingController, followController, verifyController};