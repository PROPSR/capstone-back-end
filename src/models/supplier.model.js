const mongoose = require("mongoose");

const supplierSchema = new mongoose.Schema({
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
        minLength : 6
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
    businessAddress : {
        type : String,
        required : false
    }
}, {
    timestamps: true
});


module.exports = mongoose.model("Supplier", supplierSchema);

