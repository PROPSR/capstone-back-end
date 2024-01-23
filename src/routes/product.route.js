const express = require("express");
const productRouter = express.Router();
const { getProducts, getProduct, createProduct, updateProduct, deleteProduct } = require("../controllers/product.controller");
const { validateProduct } = require("../middlewares/validation");
const { verifyToken } = require("../middlewares/jwt");
const { upload } = require("../config/multer");

productRouter.get("/", getProducts);
productRouter.get("/:id", getProduct);
productRouter.post("/", verifyToken("Supplier"), upload("supplier").array("images", 10), validateProduct, createProduct);
productRouter.patch("/:id", updateProduct);
productRouter.delete("/:id", deleteProduct);

module.exports = productRouter;