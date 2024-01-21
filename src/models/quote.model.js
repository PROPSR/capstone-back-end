const mongoose= require("mongoose");

const quoteSchema = new mongoose.Schema({
    contractor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Contractor"
    },
    project : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "Project"
    },
    amount : {
        type : Number,
        required : true
    },
    status : {
        type : String,
        enum : ["Accepted", "Pending", "Rejected"],
        default : "Pending"
    },
    dateAvailable : {
        type : Date
    },
    priorExperience : {
        type : Boolean
    },
    detailsOfPriorExperience : {
        type : String
    },
    paymentTerms : {
        type : String
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("Quote", quoteSchema);