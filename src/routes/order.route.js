const express = require("express");
const orderRouter = express.Router();
const {verifyToken} = require("../middlewares/jwt");
const {validateOrder} = require("../middlewares/validation");
const {createOrder, updateOrder, cancelOrder, getAllOrders, getMyOrder, getMyOrders, getOrder } = require("../controllers/order.controller");

orderRouter.get("/admin", getAllOrders);
orderRouter.get("/admin/:id", getOrder);
orderRouter.get("/", verifyToken("Homeowner"), getMyOrders);
orderRouter.get("/:id", verifyToken("Homeowner"), getMyOrder);
orderRouter.post("/", verifyToken("Homeowner"), validateOrder, createOrder);
orderRouter.patch("/:id/status", verifyToken("Supplier"), updateOrder);
orderRouter.delete("/:id", verifyToken("Homeowner"), cancelOrder);

module.exports = orderRouter;


