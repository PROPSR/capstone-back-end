const Project = require("../models/project.model");

module.exports.listProjects = function(req, res){
    
};

module.exports.getProject = async function(req, res){
    try {
        const id = req.project.id
        const project = await Project.findById(id).select("-password");
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

module.exports.createProject = async function(req, res){
    
    
};

module.exports.updateProject = async function(req, res){
    try {
        const id = req.project.id
        const project = await Project.findById(id).select("-password");
        if(!project) {
            return res.status(404).json({
                success: false,
                message: "Project Not Found"
            });
        };

        if (req.project.description !== '') {
            project.description = req.project.description
        }

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
        const id = req.Project.id;
        const project = await Project.findById(id);
        if(!project) {
            return res.status(404).json({
                success: false,
                message: "Project Not Found"
            });
        };
        const deletedProject = await Project.findByIdAndDelete(id);
        res.status(200).json({
            success: true,
            message: "Project Deleted Successfully",
            project: deletedProject,
          });
    } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Could Not Delete Project Data",
        });
    };
};