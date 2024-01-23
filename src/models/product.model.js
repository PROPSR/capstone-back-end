const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    brand : {
        type : String,
        required : true
    },
    category : {
        type : String,
        required : true
    },
    numberInStock:{
        type : Number,
        required : true
    },
    unitPrice: {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    technicalSpecification : {
        type : String,
        required : true
    },
    images: [
        {
            type: String
        }
    ],
    status : {
        type : String,
        enum : ["Available", "Out of stock"],
        default: "Available"
    },
    supplier : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Supplier"
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Product", productSchema);
