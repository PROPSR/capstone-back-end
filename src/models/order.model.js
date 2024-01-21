const mongoose = require("mongoose");


const orderSchema = new mongoose.Schema({
    supplier : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Supplier"
    },
    homeowner : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Homeowner"
    },
    products :[
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : "Product"
        },  
    ],
    totalPrice : {
        type : Number,
        required : true
    },
    additionalCosts:[
        {
            deliveryFee : Number,
            installationFee :  Number
        }
    ],
    status : {
        type : String,
        enum : ["Pending", "Accepted", "Delivered"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);
