const mongoose = require("mongoose");

const verificationModel = mongoose.Schema(
    {
        username: { //foreign kay
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        instagramLink: {
            type: String,
            required: true,
        },
        channel: {
            type: Boolean,
            default: false,
        }
    },
    { 
        timestamps: true,
    }
);



module.exports = mongoose.model("verification", verificationModel);