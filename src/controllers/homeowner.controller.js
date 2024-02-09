const Homeowner = require("../models/homeowner.model");
const Order = require("../models/order.model");
const Supplier = require("../models/supplier.model");
const Product = require("../models/product.model");
const Project = require("../models/project.model");
const Contractor = require("../models/contractor.model");
const { default: mongoose } = require("mongoose");


module.exports.getHomeowner = async function(req, res, next){
    try {
        let homeowner = await Homeowner.findById(req.user.id).select("-password");
        if(!homeowner) throw new Error ("The homeowner with the provided ID doesn't exist");
        res.status(200).json({
            message : "Homeowner retreived successfully",
            data : homeowner
        });
    } catch (err) {
       next(err) 
    }
};

module.exports.updateHomeowner = async function(req, res, next){
    try {
        let homeowner = await Homeowner.findByIdAndUpdate(req.user.id, req.body, {new : true}).select("-password");
        if(!homeowner) throw new Error ("The homeowner with the provided ID doesn't exist");

        res.status(200).json({
            message : "Homeowner updated successfully",
            data : homeowner
        });
    } catch (err) {
       next(err) 
    }
};

module.exports.deleteHomeowner = async function(req, res, next){
    try {
        let homeowner = await Homeowner.findByIdAndDelete(req.user.id);
        if(!homeowner) throw new Error ("The homeowner with the provided ID doesn't exist");
        res.status(200).json({
            message : "Homeowner deleted successfully"
        });
    } catch (err) {
       next(err) 
    }
};

module.exports.uploadPhoto = async function(req, res, next){
    try {
        const profilePhoto = req.file;
        const profilePhotoUrl = profilePhoto.path;
        
        let homeowner = await Homeowner.findByIdAndUpdate(req.user.id, {$set : {profilePhoto : profilePhotoUrl}}, {new : true}).select("-password");
        if(!homeowner) throw new Error ("The homeowner with the provided ID doesn't exist");
        res.status(200).json({
          message: "profilePhoto Uploaded Successfully",
          data : homeowner
        });
      } catch (err) {
            next(err);
      }
};

module.exports.getOrders = async function(req, res, next){
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const skip = (page-1) * limit;
       
        let homeowner = await Homeowner.findById(req.user.id);
        if(!homeowner) throw new Error("Homeowner with provided ID doesn't exist");

        let orders = await Order.find({homeowner : req.user.id}).skip(skip).limit(limit);

        res.status(200).json({
            message : "All orders retreived",
            data : orders
        });
    } catch (err) {
        next(err);    
    }
};

module.exports.getOrder = async function(req, res, next){
    try {     
        let homeowner = await Homeowner.findById(req.user.id);
        if(!homeowner) throw new Error("Homeowner with provided ID doesn't exist");

        let order = await Order.findById(req.params.id);
        if(!order) throw new Error("Order with provided ID doesn't exist");

        if(order.homeowner != req.user.id) throw new Error("Requested order doesn't belong to the homeowner");

        res.status(200).json({
            message : "Order retreived successfully",
            data : order
        });
    } catch (err) {
        next(err);    
    }
};

module.exports.cancelOrder = async function(req, res, next){
    try {  
        let id = req.params.id;    
        let homeowner = await Homeowner.findById(req.user.id);
        if(!homeowner) throw new Error(`Homeowner with provided ID ${req.user.id} doesn't exist`);

        let order = await Order.findById(id);
        if(!order) throw new Error(`Order with provided ID ${id} doesn't exist`);

        if(order.homeowner != req.user.id) throw new Error("Requested order doesn't belong to the homeowner");

        if(order.status !== "Pending") throw new Error("You can only cancel an order that is yet to be accepted or delivered");

        await Order.findByIdAndDelete(id);

        res.status(200).json({
            message : "Order has been cancelled successfully"
        });
    } catch (err) {
        next(err);    
    }
};

module.exports.createOrder = async function(req, res, next){
    try {
        let totalPrice, totalAdditionalCosts = 0;
        const {supplier, product, additionalCosts, quantity} = req.body;

        let homeowner = await Homeowner.findById(req.user.id);
        if(!homeowner) throw new Error(`Homeowner with provided ID ${req.user.id} doesn't exist`);

        let orderSupplier = await Supplier.findById(supplier);
        if(!orderSupplier) throw new Error(`Supplier with provided ID ${supplier} doesn't exist`);

        let orderedProduct = await Product.findById(product);
        if(!orderedProduct) throw new Error(`Product with provided ID ${product.id} doesn't exist`);

        if(orderedProduct.supplier != supplier) throw new Error(`Product doesn't belong to the supplier`);

        if(quantity > orderedProduct.numberInStock) throw new Error(`Not enough quantities of this product in stock, there are ${orderedProduct.numberInStock} left`)

        totalAdditionalCosts = additionalCosts.deliveryFee + additionalCosts.installationFee;
        totalPrice = (orderedProduct.unitPrice * quantity) + totalAdditionalCosts;
       
        let newOrder = await new Order({
            supplier,
            homeowner: req.user.id,
            product,
            unitPrice : orderedProduct.unitPrice,
            quantity,
            additionalCosts,
            totalPrice,
            status : "Pending"
        }).save();

        res.status(201).json({
            message : "Your order has been created successfully !",
            data : newOrder
        });
    } catch (err) {
        next(err);
    }
};


//Projects

module.exports.getProjects = async function(req, res, next){
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

module.exports.getProject = async function(req, res, next){
    try {     
        let homeowner = await Homeowner.findById(req.user.id);
        if(!homeowner) throw new Error("Homeowner with provided ID doesn't exist");

        let project = await Project.findById(req.params.id);
        if(!project) throw new Error("Project with provided ID doesn't exist");

        if(project.homeowner != req.user.id) throw new Error("Requested project doesn't belong to the homeowner");

        res.status(200).json({
            message : "Project retreived successfully",
            data : project
        });
    } catch (err) {
        next(err);    
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

        if(project.homeowner != req.user.id) throw new Error("Project doesn't belong to the homeowner");

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

module.exports.updateProject = async function(req, res, next){
    try {
        let projectId = req.params.id;
        let project = await Project.findById(projectId);
        if(!project) throw new Error(`Project with provided ID ${projectId} doesn't exist`);

        if(project.homeowner != req.user.id) throw new Error("Requested project doesn't belong to the homeowner");

        let existingImages = project.images;
        let newImages = req.files ? req.files.map(file =>({_id: new mongoose.Types.ObjectId(), path: file.path})): [];
        let updatedImages = [...existingImages, ...newImages];
        const {name, type, description, budget, timeline, permitsRequired, permits, materialRequirements, projectPhase,address, accessibilityNeeds } = req.body;

        let updatedProject = await Order.findByIdAndUpdate(projectId, {
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
            images: updatedImages,
        }, {new : true});
        
        res.status(200).json({
            message : "Project updated successfully",
            data : updatedProject
        });

    } catch (err) {
       next(err); 
    }
};

//Confirm order
module.exports.confirmOrder = async function(req, res, next){
    try {
        let orderId = req.params.id;
        let order = await Order.findById(orderId);
        if(!order) throw new Error(`Order with provided ID ${orderId} doesn't exist`);

        if(order.homeowner != req.user.id) throw new Error("Requested order doesn't belong to the homeowner");
        if(order.status !== "Delivered" || "Accepted") throw new Error("You can only confirm an order that is accepted or marked as delivered by the supplier");
        let updatedOrder = await Order.findByIdAndUpdate(orderId, {$set : {status : "Confirmed"}}, {new : true});
        
        res.status(200).json({
            message : "Order confirmed successfully",
            data : updatedOrder
        });

    } catch (err) {
       next(err); 
    }
};

//Assign Contractor

module.exports.assignContractor = async function(req, res, next){
    try {
        let projectId = req.params.id;
        let {contractorId} = req.body;

        let homeowner = await Homeowner.findById(req.user.id);
        if(!homeowner) throw new Error("Homeowner with provided ID doesn't exist");

        let project = await Project.findById(projectId);
        if(!project) throw new Error(`Project with provided ID ${projectId} doesn't exist`); 
        if(project.homeowner != req.user.id) throw new Error("Requested project doesn't belong to the homeowner");

        let contractor = await Contractor.findById(contractorId);
        if(!contractor) throw new Error("Contractor with provided ID doesn't exist");

        let updatedProject = await Project.findByIdAndUpdate({projectId}, {$set : {assignedContractor : contractorId, status : "Assigned"}}, {new : true});

        res.status(200).json({
            message : "Project assigned successfully",
            data : updatedProject
        });

    } catch (err) {
       next(err); 
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


module.exports.search = async function(req, res, next){
    try {
        const {projectName} = req.query;
        const projects = await Project.find({ name: { $regex: new RegExp(projectName, 'i') } });
        res.status(200).json({
            message : "All projects retreived",
            data : projects
        });
      } catch (error) {
            next(error);
      }
};

