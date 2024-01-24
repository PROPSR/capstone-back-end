const express = require("express");
const supplierRouter = express.Router();
const { signup, login } = require("../controllers/auth/supplier.auth.controller");
const { getSupplier, updateSupplier, uploadProfilePicture, deleteSupplier } = require("../controllers/supplier.controller");
const { validateSupplierSignup, validateLogin, validateSupplierUpdate } = require("../middlewares/validation");
const { verifyToken } = require("../middlewares/jwt");
const { upload } = require("../config/multer")

const { signup } = require("../controllers/auth/supplier.auth.controller");
const { getSupplier, updateSupplier } = require("../controllers/supplier.controller");
const { validateSupplierSignup, validateLogin, validateSupplierUpdate } = require("../middlewares/validation")

supplierRouter.post("/signup", validateSupplierSignup, signup);
supplierRouter.post("/login", validateLogin, login);
supplierRouter.get("/", verifyToken("Supplier"), getSupplier);
supplierRouter.patch("/update",verifyToken("Supplier"), validateSupplierUpdate, updateSupplier);
supplierRouter.patch("/upload", verifyToken("Supplier"), upload("supplier").single("profilePicture"), uploadProfilePicture);
supplierRouter.delete("/delete", verifyToken("Supplier"), deleteSupplier)
supplierRouter.post("/logout");

module.exports = supplierRouter;