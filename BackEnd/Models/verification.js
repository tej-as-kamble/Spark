const mongoose = require("mongoose");

const verificationModel = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
        },
        profileImage: {
            type: String, // Base64 encoded image data and this is required
            default: "", 
        },
        email: {
            type: String,
            required: true,
        },
        instagramLink: {
            type: String,
            required: true,
        },
        channelID: {
            type: String,
            default: "",
        }
    },
    { 
        timestamps: true,
    }
);



module.exports = mongoose.model("verification", verificationModel);