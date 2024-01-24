const express = require("express");
const orderRouter = express.Router();
const {verifyToken} = require("../middlewares/jwt");
const {validateOrder} = require("../middlewares/validation");
const {createOrder, updateOrder, cancelOrder, getAllOrders, getHomeownerOrder, getHomeownerOrders, getOrder, getSupplierOrder, getSupplierOrders } = require("../controllers/order.controller");

orderRouter.get("/", getAllOrders);
orderRouter.get("/:id", getOrder);
orderRouter.get("/homeowner", verifyToken("Homeowner"), getHomeownerOrders);
orderRouter.get("/homeowner/:id", verifyToken("Homeowner"), getHomeownerOrder);
orderRouter.get("/supplier", verifyToken("Supplier"), getSupplierOrders);
orderRouter.get("/supplier/:id", verifyToken("Supplier"), getSupplierOrder);
orderRouter.post("/", verifyToken("Homeowner"), validateOrder, createOrder);
orderRouter.patch("/:id/status", verifyToken("Supplier"), updateOrder);
orderRouter.delete("/:id", verifyToken("Homeowner"), cancelOrder);

module.exports = orderRouter;


