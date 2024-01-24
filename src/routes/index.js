const express = require("express");
const router = express.Router();
const orderRouter = require("./order.route");
const quoteRouter = require("./quote.route");
const projectRouter = require("./project.route");
const productRouter = require("./product.route");
const homeownerRouter = require("./homeowner.route");
const supplierRouter = require("./supplier.route");
const contractorRouter = require("./contractor.route");
const loginRouter = require("./login.route");

router.use("/auth", loginRouter);
router.use("/homeowner", homeownerRouter);
router.use("/supplier", supplierRouter);
router.use("/contractor", contractorRouter);
router.use("/orders", orderRouter);
router.use("/projects", projectRouter);
router.use("/quotes", quoteRouter);
router.use("/products", productRouter);

module.exports = router;