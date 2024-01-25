const { cloudinary } = require("../config/cloudinary");
const Supplier = require("../models/supplier.model");
const Order= require("../models/order.model");
const Product = require("../models/product.model");
const jwt = require("jsonwebtoken");


module.exports.getSupplier = async function(req, res){
    try {
        const id = req.user.id;
        const supplier = await Supplier.findById(id).select("-password");
        if(!supplier) {
            return res.status(404).json({
                message: "Supplier not found"
            });
        };
        return res.status(200).json({
            message: "Supplier retrieved",
            data: supplier
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Supplier retrieval failed"
        })
    }
};

module.exports.updateSupplier = async function(req, res){
    try {
        const id = req.user.id;
        const supplier = await Supplier.findById(id);
        if(!supplier) {
            return res.status(404).json({
                message: "Supplier not found"
            });
        };
        const updatedSupplier = await Supplier.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        if (!updatedSupplier) {
            return res.status(404).json({
              message: "Supplier not found for update",
            });
          }          
        res.status(200).json({
            message: "Supplier data has been updated",
            Supplier: updatedSupplier
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Supplier data update failed"
        });
    };
};

module.exports.uploadProfilePicture = async function(req, res){
    try {
        const id = req.user.id;
        const supplier = await Supplier.findById(id);
        if(!supplier) {
            return res.status(404).json({
                message: "Supplier not found"
            });
        };
        const profilePicture = req.file;
        let profilePictureUrl;
        if(profilePicture) {
            profilePictureUrl = profilePicture.path;
        };

        const supplierPicture = await Supplier.findByIdAndUpdate(id, {profilePicture: profilePictureUrl}, {new: true}).select("-password");
        res.status(200).json({
            message: "Supplier profile picture upload successful",
            supplier: supplierPicture
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Supplier data update failed"
        });
    };
};

module.exports.deleteSupplier = async function(req, res){
    try {
        const id = req.user.id;
        const supplier = await Supplier.findById(id);
        if(!supplier) {
            return res.status(404).json({
                message: "Supplier Not Found"
            });
        };
        const deletedSupplier = await Supplier.findByIdAndDelete(id);
        res.status(200).json({
            message: "Supplier Deleted",
            supplier: deletedSupplier,
          });
    } catch (error) {
        res.status(500).json({
            message: "Supplier Delete Failed"
       });
   };
};

//Orders

module.exports.updateOrder = async function(req, res, next){
    try {
        let {status} = req.body;
        let orderId = req.params.id;

        let order = await Order.findById(orderId);
        if(!order) throw new Error(`Order with provided ID ${orderId} doesn't exist`);

        if(order.supplier != req.user.id) throw new Error("Requested order doesn't belong to the supplier");
        let updatedOrder = await Order.findByIdAndUpdate(orderId, {$set : {status : status}}, {new : true});
        
        if(status === "Accepted"){
            let product = await Product.findByIdAndUpdate(order.product, { $inc: { numberInStock: - order.quantity }}, {new : true});
            if(!product) throw new Error(`An error occured`);
        };

        res.status(200).json({
            message : "Order status updated successfully",
            data : updatedOrder
        });

    } catch (err) {
       next(err); 
    }
};


//Supplier logs in and sees a list of orders
module.exports.getOrders = async function(req, res, next){
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const skip = (page-1) * limit;
       
        let supplier = await Supplier.findById(req.user.id);
        if(!supplier) throw new Error("Supplier with provided ID doesn't exist");

        let orders = await Order.find({supplier : req.user.id}).skip(skip).limit(limit);

        res.status(200).json({
            message : "All orders retreived",
            data : orders,
            limit,
            page
        });
    } catch (err) {
        next(err);    
    }
};

module.exports.getOrder = async function(req, res, next){
    try {     
        let supplier = await Supplier.findById(req.user.id);
        if(!supplier) throw new Error("Supplier with provided ID doesn't exist");

        let order = await Order.findById(req.params.id);
        if(!order) throw new Error("Order with provided ID doesn't exist");

        if(order.supplier != req.user.id) throw new Error("Requested order doesn't belong to the supplier");

        res.status(200).json({
            message : "Order retreived successfully",
            data : order
        });
    } catch (err) {
        next(err);    
    }
};
