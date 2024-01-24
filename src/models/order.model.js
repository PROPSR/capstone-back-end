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
    product : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Product"
    },
    unitPrice : {
        type : Number,
        required : true 
    },
    quantity : {
        type : Number,
        required : true
    },
    additionalCosts : {
        deliveryFee : {
            type : Number,
            default : 0
        },
        installationFee: {
            type : Number,
            default : 0
        }
    },
    totalPrice : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        enum : ["Pending", "Accepted", "Rejected", "Delivered"]
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Order", orderSchema);
