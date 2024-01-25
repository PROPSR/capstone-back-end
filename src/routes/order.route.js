const express = require("express");
const orderRouter = express.Router();
const {getAllOrders, getOrder } = require("../controllers/order.controller");

orderRouter.get("/", getAllOrders);
orderRouter.get("/:id", getOrder);


module.exports = orderRouter;


