const Project = require("../models/project.model");
const Homeowner = require("../models/homeowner.model");
const mongoose = require("mongoose");

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

//Admin getting a project by ID
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
        res.status(500).json({
            success: false,
            message: "Failed To Fetch Project Data"
        });
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


module.exports.createProject = async function(req, res, next){    
    try {
        const {name, type, description, budget, timeline, permitsRequired, permits, materialRequirements, projectPhase,address, accessibilityNeeds } = req.body;

        let homeowner = await Homeowner.findById(req.user.id);
        if(!homeowner) throw new Error(`Homeowner with provided ID ${req.user.id} doesn't exist`);
        const images = req.files ? req.files.map(file => file.path) : [];
        const imageWithIds = images.map(path => ({_id: new mongoose.Types.ObjectId(), path}));

        let newProject = new Project({
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
            images: imageWithIds,
            homeowner : req.user.id
        });

        await newProject.save();

        res.status(201).json({
            message : "Your project has been created successfully!",
            data : newProject
        });
    } catch (err) {
        next(err);
    } 
};

module.exports.search = async function(req, res, next){
    try {

        // const query = {};

        // if (filterParams.name) {
        //   query.name = { $regex: filterParams.name, $options: 'i' }; // Case-insensitive search
        // }
      
        // if (filterParams.category) {
        //   query.category = filterParams.category;
        // }
        // const page = req.query.page || 1;
        // const limit = req.query.limit || 10;
        // const skip = (page-1) * limit;
        // const search = req.query.search || ""

        // const { name, category, price } = req.query;
    
        // // Build the filter object based on the provided parameters
        // const filter = {};
        // if (name) filter.name = new RegExp(name, 'i'); // Case-insensitive name search
        // if (category) filter.category = category;
        // if (price) filter.price = { $gte: parseFloat(price) };
    
        // // Use the filter object in the Mongoose find method
        // const items = await Project.find(filter);
        // res.json(items);
      } catch (error) {
            next(error);
      }
};

module.exports.filter = async function(req, res, next){
    try {

        console.log(req.query);

        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const skip = (page-1) * limit;
        const query = {};

        if (req.query.status) {
          query.status = { $regex: req.query.status, $options: 'i' };
        }
      
        if (req.query.type) {
            query.type = { $regex: req.query.type, $options: 'i' }; 
          }

        console.log(query);

        const projects = await Project.find(query).skip(skip).limit(limit);
        res.status(200).json({
            message : "All projects retreived",
            data : projects
        });
      } catch (error) {
            next(error);
      }
};


