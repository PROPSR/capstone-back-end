const mongoose = require("mongoose");

const contractorSchema = new mongoose.Schema({
    email : {
        type : String,
        unique : true,
        required : true,
        trim : true,
        lowercase : true
    },
    password: {
        type : String,
        required : true,
        minLength : 8
    },
    profilePhoto: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQXIhb00MEUDthNmHF3cKqcqOkjHC2PWkOmTFB38R3bAc0cTwImJaUSj4LUqQ&s"
    },
    firstName : {
        type : String,
        required : true,
        minLength : 0,
        maxLength : 255
    },
    lastName : {
        type : String,
        required : true,
        minLength : 0,
        maxLength : 255
    },
    phoneNumber : {
        type : String,
        required : true
    },
    userType : {
        type : String,
        enum : ["Homeowner", "Contractor","Supplier"],
    },
    yearsOfExperience : {
        type : Number,
        minLength : 0,
    },
    businessAddress : {
        type : String,
    },
    city:{
        type : String
    },
    state:{
        type : String
    },
    commsPreference : {
        type : String,
        enum : ["Email", "Phone Number", "WhatsApp"]
    },
    references : {
        type : String
    },
    workSchedule : {
        type : String
    },
    licensing :{
        type : Boolean
    },
    insurance : {
        type : Boolean
    },
    scopeOfWork : {
        type : String,
        enum : ["Specific tasks", "Full project management"] 
    },
    profileStatus: {
        type: String,
        enum: ["Pending", "Complete"],
        default: "Pending"
    },
    isEmailVerified: {
        type: Boolean,
        enum: [true, false],
        default: false
    }
}, {
    timestamps: true
});


module.exports = mongoose.model("Contractor", contractorSchema);