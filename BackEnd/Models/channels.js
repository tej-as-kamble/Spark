const mongoose = require("mongoose");

const channelModel = mongoose.Schema(
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
            type: String, // Base64 encoded image data
            // required: true, 
        },
        Message: [
            {
                content: {
                    type: String,
                    default: ""
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            }
        ],
    },
    { 
        timestamps: true,
    }
);

module.exports = mongoose.model("channels", channelModel);