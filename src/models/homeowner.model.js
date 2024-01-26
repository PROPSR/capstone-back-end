const {Schema , model} = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const maxAge = "2 days"

const homeOwnerSchema = new Schema({
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
        required : true
    },
    address : {
        type : String
    },
    city:{
        type : String
    },
    state:{
        type : String
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

homeOwnerSchema.pre("save", async function(){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
});

homeOwnerSchema.methods.generateToken = function(){
    return jwt.sign({
        firstName : this.firstName, 
        lastName : this.lastName,
        id : this._id,
        email : this.email,
        address : this.address,
        phoneNumber : this.phoneNumber,
        userType : this.userType
    }, 
        JWT_SECRET, 
        {expiresIn : maxAge}
    )};

module.exports = model("Homeowner", homeOwnerSchema);

