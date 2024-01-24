const { cloudinary } = require("../config/cloudinary");
const Contractor = require("../models/contractor.model");

module.exports.getContractor = async function(req, res){
    try {
        const id = req.user.id;
        const contractor = await Contractor.findById(id).select("-password");
        if(!contractor) {
            return res.status(404).json({
                success: false,
                message: "Contractor Not Found"
            });
        };


        console.log(project);
        res.status(200).json({
            success: true,
            project: project
        });

    } catch (error) {
        consloe.log(error);
        res.status(500).json({
            success: false,
            message: "Failed To Fetch Contractor Data"
        });
    };
};

module.exports.uploadProfilePhoto = async function(req, res){
    try {
        const id = req.user.id;
        const user = await Contractor.findById(id);
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "Contractor Not Found"
            });
        };
        const profilePhoto  = req.file;
        let profilePhotoUrl;
        if(profilePhoto) {
            profilePhotoUrl = profilePhoto.path;
        };

        const contractor = await Contractor.findByIdAndUpdate(id, {profilePhoto: profilePhotoUrl}, {new: true}).select("-password");
        console.log(contractor);
        res.status(200).json({
            success: true,
            message: "ProfilePhoto Uploaded Successfully",
            contractor: contractor,
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "upload Failed",
        });
    };
};

module.exports.updateContractor = async function(req, res){
    try {
        const id = req.user.id;
        const user = await Contractor.findById(id);
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "Contractor Not Found"
            });
        };
        const updatedContractor = await Contractor.findByIdAndUpdate(id, {$set: req.body}, {new: true});
        res.status(200).json({
            success: true,
            message: "Contractor Data Updated Successfully",
            contractor: updatedContractor,
          });
    } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Could Not Update Contractor Data",
        });
    };
};

module.exports.deleteContractor = async function(req, res){
    try {
        const id = req.user.id;
        const user = await Contractor.findById(id);
        if(!user) {
            return res.status(404).json({
                success: false,
                message: "Contractor Not Found"
            });
        };
        const deletedContractor = await Contractor.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Contractor Data Deleted Successfully",
            contractor: deletedContractor,
          });
    } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Could Not Delete Contractor Data",
        });
    };
};