const Product = require("../models/product.model");
const Supplier = require("../models/supplier.model");
const mongoose = require("mongoose");

module.exports.getProducts = async function (req, res) {
    try {
        const products = await Product.find();
        if(!products) {
            return res.status(404).json({
                success: false,
                message: "Products Not Found"
            });
        };

        res.status(200).json({
            success: true,
            message: "Products Fetched Successfully",
            products: products
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed To Fetch Products"
        });
    };
};

module.exports.getProduct = async function (req, res) {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        if(!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        };

        res.status(200).json({
            success: true,
            message: "Product Fetched Successfully",
            product: product
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed To Fetch Product"
        });
    };
};

module.exports.getProductsForSupplier = async function (req, res) {
    try {
        const id = req.user.id;
        const supplier = await Supplier.findById(id);
        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: "Supplier Not Found"
            });
        };
        const products = await Product.find({supplier: supplier._id});
        if(!products) {
            return res.status(404).json({
                success: false,
                message: "Products Not Found"
            });
        };

        res.status(200).json({
            success: true,
            message: "Products Fetched Successfully",
            products: products
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed To Fetch Products"
        });
    };
};

module.exports.getProductForSupplier = async function (req, res) {
    try {
        const id = req.user.id;
        const productId = req.params.id;
        const supplier = await Supplier.findById(id);
        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: "Supplier Not Found"
            });
        };
        const product = await Product.findOne({_id: productId, supplier: supplier._id});
        if(!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        };

        res.status(200).json({
            success: true,
            message: "Product Fetched Successfully",
            product: product
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed To Fetch Product"
        });
    };
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
        const imagesWithIds = images.map(path => ({ _id: new mongoose.Types.ObjectId(), path }));

        const newProduct = new Product({
            supplier: supplier._id,
            numberInStock,
            unitPrice,
            name,
            brand,
            category,
            technicalSpecification,
            description,
            images: imagesWithIds
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

module.exports.updateProduct = async function (req, res) {
    try {
      const id = req.user.id;
      const productId = req.params.id;
      const product = await Product.findOne({ _id: productId, supplier: id });
  
      if (!product) {
        return res.status(403).json({ message: "Forbidden. You are not authorized to update this product." });
      }
  
      const { name, brand, category, numberInStock, unitPrice, description, technicalSpecification, status } = req.body;
  
      let existingImages = product.images;
      let newImages = req.files ? req.files.map(file => ({ _id: new mongoose.Types.ObjectId(), path: file.path })) : [];
  
      let updatedImages = [...existingImages, ...newImages];
  
      const updatedProduct = await Product.findByIdAndUpdate(productId, {
        name,
        brand,
        category,
        numberInStock,
        unitPrice,
        description,
        technicalSpecification,
        images: updatedImages,
        status,
      }, { new: true });
  
      res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
    } catch (error) {
      res.status(500).json({ message: "Error updating product", error: error.message });
    }
};
  
module.exports.deleteProductImage = async function(req, res) {
    try {
        const id = req.user.id;
        const productId = req.params.id;
        const imageId = req.params.imageId;
    
        const product = await Product.findById(productId);
    
        if (!product) {
          return res.status(404).json({ message: "Product not found" });
        }
    
        if (product.supplier.toString() !== id) {
          return res.status(403).json({ message: "Forbidden. You are not authorized to delete images for this product." });
        }
    
        const imageIndex = product.images.findIndex(image => image._id.toString() === imageId);
    
        if (imageIndex === -1) {
          return res.status(404).json({ message: "Image not found" });
        }
    
        product.images.splice(imageIndex, 1);
        await product.save();
    
        return res.status(200).json({ message: "Image deleted successfully", product: product });
      } catch (error) {
        return res.status(500).json({ message: "Error deleting image", error: error.message });
      }
}

module.exports.deleteProduct = async function (req, res) {
    try {
        const id = req.user.id;
        const productId = req.params.id;
        const supplier = await Supplier.findById(id);
        if (!supplier) {
            return res.status(404).json({
                success: false,
                message: "Supplier Not Found"
            });
        };
        const product = await Product.findByIdAndDelete(productId);
        if(!product) {
            return res.status(404).json({
                success: false,
                message: "Product Not Found"
            });
        };

        res.status(200).json({
            success: true,
            message: "Product Deleted Successfully",
            deletedProduct: product
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed To Delete Product"
        });
    };
};