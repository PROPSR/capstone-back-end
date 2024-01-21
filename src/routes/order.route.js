const express = require("express");
const orderRouter = express.Router();
const { getOrders, getOrder, createOrder, updateOrder, deleteOrder } = require("../controllers/order.controller");

orderRouter.get("/", getOrders);
orderRouter.get("/:id", getOrder);
orderRouter.post("/", createOrder);
orderRouter.patch("/:id", updateOrder);
orderRouter.delete("/:id", deleteOrder);

module.exports = orderRouter;