const Project = require("../models/project.model");
const Homeowner = require("../models/homeowner.model");

//Admin getting all projects
module.exports.listProjects = async function(req, res, next){
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const skip = (page-1) * limit;

        let projects = await Project.find({}).skip(skip).limit(limit);

        res.status(200).json({
            message : "All projects retreived",
            data : projects
        });
    } catch (err) {
        next(err);    
    }
};

//This would be the list presented to all contractors i.e. unassigned
module.exports.projectsMarketplace = async function(req, res, next){
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page-1) * limit;

        let projects = await Project.find({status : "unassigned"}).skip(skip).limit(limit);

        res.status(200).json({
            message : "All projects retreived",
            data : projects
        });
    } catch (err) {
        next(err);    
    }
};

module.exports.listHomeownerProjects = async function(req, res, next){
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const skip = (page-1) * limit;
       
        let homeowner = await Homeowner.findById(req.user.id);
        if(!homeowner) throw new Error("Homeowner with provided ID doesn't exist");

        let projects = await Project.find({homeowner : req.user.id}).skip(skip).limit(limit);

        res.status(200).json({
            message : "All projects retreived",
            data : projects
        });
    } catch (err) {
        next(err);    
    } 
};

module.exports.getHomeownerProject = async function(req, res, next){
    try {     
        let homeowner = await Homeowner.findById(req.user.id);
        if(!homeowner) throw new Error("Homeowner with provided ID doesn't exist");

        let project = await Project.findById(req.params.id);
        if(!order) throw new Error("Project with provided ID doesn't exist");

        if(project.homeowner !== req.user.id) throw new Error("Requested project doesn't belong to the homeowner");

        res.status(200).json({
            message : "Project retreived successfully",
            data : project
        });
    } catch (err) {
        next(err);    
    }
};

module.exports.getProject = async function(req, res){
    try {
        const project = await Project.findById(req.params.id);
        if(!project) {
            return res.status(404).json({
                success: false,
                message: "Project Not Found"
            });
        };

        res.status(200).json({
            success: true,
            project: project
        });

    } catch (error) {
        consloe.log(error);
        res.status(500).json({
            success: false,
            message: "Failed To Fetch Project Data"
        });
    }
};

module.exports.deleteProject = async function(req, res){
    try {
        let homeowner = await Homeowner.findById(req.user.id);
        if(!homeowner) throw new Error("Homeowner with provided ID doesn't exist");

        const project = await Project.findById(req.params.id);
        if(!project) {
            return res.status(404).json({
                success: false,
                message: "Project Not Found"
            });
        };

        if(project.homeowner !== req.user.id) throw new Error("Project doesn't belong to the homeowner");

        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success: true,
            message: "Project Deleted Successfully",
            project: deletedProject
          });
    } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Could Not Delete Project Data",
        });
    };
};


module.exports.createProject = async function(req, res, next){    
    try {
        const {name, type, description, budget, timeline, permitsRequired, permits, materialRequirements, projectPhase,address, accessibilityNeeds, images } = req.body;

        let homeowner = await Homeowner.findById(req.user.id);
        if(!homeowner) throw new Error(`Homeowner with provided ID ${req.user.id} doesn't exist`);

        let newProject = new Order({
            name,
            type,
            description,
            budget,
            timeline,
            permitsRequired,
            permits,
            materialRequirements,
            projectPhase,
            address,
            accessibilityNeeds,
            images,
            homeowner : req.user.id,
            status : "unassigned"
        }).save();

        res.status(201).json({
            message : "Your project has been created successfully!",
            data : newProject
        });
    } catch (err) {
        next(err);
    } 
};

module.exports.updateProject = async function(req, res, next){
    try {
        let projectId = req.params.id;
        let project = await Project.findById(projectId);
        if(!project) throw new Error(`Project with provided ID ${projectId} doesn't exist`);

        if(project.homeowner !== req.user.id) throw new Error("Requested project doesn't belong to the homeowner");
        let updatedProject = await Order.findByIdAndUpdate(projectId, {$set : req.body}, {new : true});
        
        res.status(200).json({
            message : "Project updated successfully",
            data : updatedProject
        });

    } catch (err) {
       next(err); 
    }
};

module.exports.assignContractor = async function(req, res, next){
    
};

module.exports.getContractorAssignedProjects = async function(req, res, next){
 
};

module.exports.getContractorAssignedProject = async function(req, res, next){
 
};

