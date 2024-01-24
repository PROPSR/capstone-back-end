const express = require("express");
const supplierRouter = express.Router();
const { signup } = require("../controllers/auth/supplier.auth.controller");
const { validateSupplierSignup, validateSupplierUpdate } = require("../middlewares/validation")
const { getSupplier, updateSupplier, uploadProfilePicture, deleteSupplier } = require("../controllers/supplier.controller");
const { verifyToken } = require("../middlewares/jwt");
const { upload } = require("../config/multer")




supplierRouter.post("/signup", validateSupplierSignup, signup);
supplierRouter.get("/", verifyToken("Supplier"), getSupplier);
supplierRouter.patch("/update",verifyToken("Supplier"), validateSupplierUpdate, updateSupplier);
supplierRouter.patch("/upload", verifyToken("Supplier"), upload("supplier").single("profilePicture"), uploadProfilePicture);
supplierRouter.delete("/delete", verifyToken("Supplier"), deleteSupplier)
supplierRouter.post("/logout");

module.exports = supplierRouter;