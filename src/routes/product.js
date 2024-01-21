const express = require("express");
const productRouter = express.Router();
const productController = require("../controllers/product");

productRouter.get("/", productController.getProducts);
productRouter.get("/:id", productController.getProduct);
productRouter.post("/", productController.createProduct);
productRouter.patch("/:id", productController.updateProduct);
productRouter.delete("/:id", productController.deleteProduct);

module.exports = productRouter;