const express = require("express");
const productRouter = express.Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct, getProductsForSupplier, getProductForSupplier, deleteProductImage } = require("../controllers/product.controller");
const { validateProductUpdate, validateProductCreation } = require("../middlewares/validation");
const { verifyToken } = require("../middlewares/jwt");
const { upload } = require("../config/multer");

productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);
productRouter.get("/auth", verifyToken("Supplier"), getProductsForSupplier);
productRouter.get("/auth/:id", verifyToken("Supplier"), getProductForSupplier);
productRouter.post("/", verifyToken("Supplier"), upload("supplier").array("images", 10), validateProductCreation, createProduct);
productRouter.patch("/auth/:id", verifyToken("Supplier"), upload("supplier").array("images", 10), validateProductUpdate, updateProduct);
productRouter.delete("/image/auth/:id/:imageId", verifyToken("Supplier"), deleteProductImage);
productRouter.delete("/auth/:id", verifyToken("Supplier"), deleteProduct);

module.exports = productRouter;