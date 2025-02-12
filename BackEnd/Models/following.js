const mongoose = require("mongoose");

const followingModel = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        followingList:{
            type: [String], //username of celebrity
            default: [],
        },
    },
    { 
        timestamps: true,
    }
);

module.exports = mongoose.model("following", followingModel);