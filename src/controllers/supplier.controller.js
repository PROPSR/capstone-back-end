const { cloudinary } = require("../config/cloudinary");
const Supplier = require("../models/supplier.model");
const jwt = require("jsonwebtoken")


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

module.exports.uploadProfilePhoto = async function(req, res){
    try {
        const id = req.user.id;
        const supplier = await Supplier.findById(id);
        if(!supplier) {
            return res.status(404).json({
                message: "Supplier not found"
            });
        };
        const profilePhoto = req.file;
        let profilePhotoUrl;
        if(profilePhoto) {
            profilePhotoUrl = profilePhoto.path;
        };

        const supplierPicture = await Supplier.findByIdAndUpdate(id, {profilePhoto: profilePhotoUrl}, {new: true}).select("-password");
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
