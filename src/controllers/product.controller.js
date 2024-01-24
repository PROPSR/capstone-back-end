const Product = require("../models/product.model");
const Supplier = require("../models/supplier.model");

module.exports.getProducts = function (req, res) {

};

module.exports.getProduct = function (req, res) {

};

module.exports.createProduct = async function (req, res) {
    try {
        const id = req.user.id;
        const supplier = await Supplier.findById(id);
        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: "Supplier Not Found"
            });
        };
        const { numberInStock, unitPrice, name, brand, category, technicalSpecification, description } = req.body;
        const images = req.files ? req.files.map(file => file.path) : [];
        const newProduct = new Product({
            supplier: supplier._id,
            numberInStock,
            unitPrice,
            name,
            brand,
            category,
            technicalSpecification,
            description,
            images
        });
        await newProduct.save();
        res.status(200).json({
            success: true,
            message: "Product Added Successfully",
            product: newProduct
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed To Add Product"
        })
    };
};

module.exports.updateProduct = function (req, res) {

};

module.exports.deleteProduct = function (req, res) {

};