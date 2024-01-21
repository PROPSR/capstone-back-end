const express = require("express");
const supplierRouter = express.Router();
const { signup, login } = require("../controllers/auth/supplier.auth.controller");
const { getSupplier, updateSupplier } = require("../controllers/supplier.controller");

supplierRouter.post("/signup", signup);
supplierRouter.post("/login", login);
supplierRouter.get("/", getSupplier);
supplierRouter.patch("/update", updateSupplier);
supplierRouter.post("/logout");

module.exports = supplierRouter;