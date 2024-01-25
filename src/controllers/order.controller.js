const Order = require("../models/order.model");


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
