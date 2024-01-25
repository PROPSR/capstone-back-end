const { cloudinary } = require("../config/cloudinary");
const Contractor = require("../models/contractor.model");
const Project = require("../models/project.model");

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
        console.log(error);
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

module.exports.getAssignedProjects = async function(req, res, next){
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const skip = (page-1) * limit;
       
        let contractor = await Contractor.findById(req.user.id);
        if(!contractor) throw new Error("Contractor with provided ID doesn't exist");

        let assignedProjects = await Project.find({assignedContractor : req.user.id}).skip(skip).limit(limit);

        res.status(200).json({
            message : "All assigned projects retreived",
            data : assignedProjects
        });
    } catch (err) {
        next(err);    
    } 
};

module.exports.getAssignedProject = async function(req, res, next){
    try {     
        let contractor = await Contractor.findById(req.user.id);
        if(!contractor) throw new Error("Contractor with provided ID doesn't exist");

        let project = await Project.findById(req.params.id);
        if(!project) throw new Error("Project with provided ID doesn't exist");

        if(project.assignedContractor != req.user.id) throw new Error("Requested project is not assigned to the contractor");

        res.status(200).json({
            message : "Project retreived successfully",
            data : project
        });
    } catch (err) {
        next(err);    
    }
};