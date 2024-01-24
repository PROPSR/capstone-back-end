const Supplier = require("../../models/supplier.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


module.exports.signup = async function(req, res){
    try {
        const { firstName, lastName, phoneNumber, email, password } = req.body;
        if (!(firstName && lastName && phoneNumber && email && password)) {
            return res.status(400).send(`All fields are mandatory`);
          }

        const user = await Supplier.findOne({ email: email });
        if (user) {
            return res.status(400).json({
                message: "Email already exists"
            });
        };

        //hash password
        const hashedPassword = await bcrypt.hash(req.body.password + process.env.BCRYPT_PASSWORD, 10);

        const newSupplier = new Supplier({
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            email: email,
            password: hashedPassword,
            userType: "Supplier"
        })

        await newSupplier.save();
        res.status(200).json({
            message: "Supplier Registration Successful",
            data: newSupplier
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Supplier Registration Failed",
            error: error.message
        })
    }
};

module.exports.login = async function(req, res){
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).send("All fields are mandatory"); 
        }

        const supplier = await Supplier.findOne({ email: email });
        if(!supplier) {
            return res.status(404).json({
                message: "Supplier is not registered"
            })
        }
        const hashedPassword = supplier.password
        if(!(await bcrypt.compare(password + process.env.BCRYPT_PASSWORD, hashedPassword))) {
            return res.status(401).json({
                message: "Email or password is not correct",
            })
        }
        const token = jwt.sign({id: supplier._id, userType: "Supplier"}, process.env.JWT_SECRET, { expiresIn: "24h"} );
        res.status(200).json({
            message: "Supplier Logged In",
            supplier: supplier,
            token: token
        })
    } catch (error) {
        res.status(500).json({
            error: error.message,
            message: "Supplier Login Failed"
        });
    }
};