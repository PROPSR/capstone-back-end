const express = require("express");
const router = express.Router();
const userRouter = require("./auth");
const orderRouter = require("./order");
const quoteRouter = require("./quote");
const projectRouter = require("./project");
const productRouter = require("./product");

router.use("/auth", userRouter);
router.use("/orders", orderRouter);
router.use("/projects", projectRouter);
router.use("/quotes", quoteRouter);
router.use("/products", productRouter);

module.exports = router;