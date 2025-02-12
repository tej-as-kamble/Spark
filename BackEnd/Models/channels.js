const mongoose = require("mongoose");

const channelModel = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        Message:{
            type: [{
                content: {
                    type: String,
                    default: ""
                },
                createdAt: {
                    type: Date,
                    default: Date.now,
                },
            }],
            default: [],
        },
        CountMsg:{
            type: Number,
            default: 0,
        }
    },
    { 
        timestamps: true,
    }
);

module.exports = mongoose.model("channels", channelModel);