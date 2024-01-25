const { Schema, model} = require("mongoose")

const otpSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId
    },
    email: {
        type: String
    },
    otp: {
        type: Number
    },
    type: {
        type: String,
        enum: ["Email-Verification", "Password-Reset"]
    },
    userType: {
        type: String,
        enum: ["Supplier", "Contractor", "Homeowner"]
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 600
    }
})

module.exports = model("Otp", otpSchema)