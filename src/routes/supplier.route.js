const express = require("express");
const supplierRouter = express.Router();
const { signup } = require("../controllers/auth/supplier.auth.controller");
const { getSupplier, updateSupplier } = require("../controllers/supplier.controller");
const { validateSupplierSignup, validateLogin, validateSupplierUpdate } = require("../middlewares/validation")

supplierRouter.post("/signup", validateSupplierSignup, signup);
supplierRouter.get("/", getSupplier);
supplierRouter.patch("/update", validateSupplierUpdate, updateSupplier);
supplierRouter.post("/logout");

module.exports = supplierRouter;