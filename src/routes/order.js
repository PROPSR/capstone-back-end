const express = require("express");
const orderRouter = express.Router();
const orderController = require("../controllers/order");

orderRouter.get("/", orderController.getOrders);
orderRouter.get("/:id", orderController.getOrder);
orderRouter.post("/", orderController.createOrder);
orderRouter.patch("/:id", orderController.updateOrder);
orderRouter.delete("/:id", orderController.deleteOrder);

module.exports = orderRouter;