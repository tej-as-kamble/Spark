const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userModel = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        profileImage: {
            type: String, // Base64 encoded image data
            default: "",
        },
        followingList:{
            type: [String],
            default: [],
        },
        channelID:{
            type: String,
            default: "",
        },
    },
    { 
        timestamps: true,
    }
);


userModel.methods.matchPassword = async function  (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userModel.pre("save", async function (name) {
    if(!this.isModified){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})


module.exports = mongoose.model("User", userModel);