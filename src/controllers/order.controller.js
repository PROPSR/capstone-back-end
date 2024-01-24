const Order = require("../models/order.model");
const Homeowner = require("../models/homeowner.model");
const Supplier = require("../models/supplier.model");
const Product = require("../models/product.model");


//Admin get all orders
module.exports.getAllOrders = async function(req, res, next){
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const skip = (page-1) * limit;

        let orders = await Order.find({}).skip(skip).limit(limit);

        res.status(200).json({
            message : "All orders retreived",
            data : orders
        });
    } catch (err) {
        next(err);    
    }
};

//Admin request for an order by its ID
module.exports.getOrder = async function(req, res, next){
    try {     
        let order = await Order.findById(req.params.id);
        if(!order) throw new Error("Order with provided ID doesn't exist");

        res.status(200).json({
            message : "Order retreived successfully",
            data : order
        });
    } catch (err) {
        next(err);    
    }
};

//Get all orders for a homeowner
module.exports.getHomeownerOrders = async function(req, res, next){
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


//Retrieve an order from a homeowner by ID
module.exports.getHomeownerOrder = async function(req, res, next){
    try {     
        let homeowner = await Homeowner.findById(req.user.id);
        if(!homeowner) throw new Error("Homeowner with provided ID doesn't exist");

        let order = await Order.findById(req.params.id);
        if(!order) throw new Error("Order with provided ID doesn't exist");

        if(order.homeowner !== req.user.id) throw new Error("Requested order doesn't belong to the homeowner");

        res.status(200).json({
            message : "Order retreived successfully",
            data : order
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

        totalAdditionalCosts = additionalCosts.deliveryFee + additionalCosts.installationFee;
        totalPrice = (orderedProduct.unitPrice * quantity) + totalAdditionalCosts;
       
        let newOrder = new Order({
            supplier,
            homeowner: req.user.id,
            product,
            unitPrice : orderedProduct.unitPrice,
            quantity,
            additionalCosts : totalAdditionalCosts,
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


module.exports.updateOrder = async function(req, res, next){
    try {
        let {status} = req.body;
        let orderId = req.params.id;

        let order = await Order.findById(orderId);
        if(!order) throw new Error(`Order with provided ID ${orderId} doesn't exist`);

        if(order.supplier !== req.user.id) throw new Error("Requested order doesn't belong to the supplier");
        let updatedOrder = await Order.findByIdAndUpdate(orderId, {$set : {status : status}}, {new : true});
        
        res.status(200).json({
            message : "Order status updated successfully",
            data : updatedOrder
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

        if(order.homeowner !== req.user.id) throw new Error("Requested order doesn't belong to the homeowner");

        if(order.status !== "Pending") throw new Error("You can only cancel an order that is yet to be accepted or delivered");

        await Order.findByIdAndDelete(id);

        res.status(200).json({
            message : "Order has been cancelled successfully"
        });
    } catch (err) {
        next(err);    
    }
};

//Supplier logs in and sees a list of orders
module.exports.getSupplierOrders = async function(req, res, next){
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;
        const skip = (page-1) * limit;
       
        let supplier = await Supplier.findById(req.user.id);
        if(!supplier) throw new Error("Supplier with provided ID doesn't exist");

        let orders = await Order.find({supplier : req.user.id}).skip(skip).limit(limit);

        res.status(200).json({
            message : "All orders retreived",
            data : orders
        });
    } catch (err) {
        next(err);    
    }
};

module.exports.getSupplierOrder = async function(req, res, next){
    try {     
        let supplier = await Supplier.findById(req.user.id);
        if(!supplier) throw new Error("Supplier with provided ID doesn't exist");

        let order = await Order.findById(req.params.id);
        if(!order) throw new Error("Order with provided ID doesn't exist");

        if(order.supplier !== req.user.id) throw new Error("Requested order doesn't belong to the supplier");

        res.status(200).json({
            message : "Order retreived successfully",
            data : order
        });
    } catch (err) {
        next(err);    
    }
};