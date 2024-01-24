const Contractor = require("../../models/contractor.model");
const Supplier = require("../../models/supplier.model");
const Homeowner = require("../../models/homeowner.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.login = async function (req, res) {
    try {
        const { email, password } = req.body;

        const contractor = await Contractor.findOne({ email: email });
        const supplier = await Supplier.findOne({ email: email });
        const homeowner = await Homeowner.findOne({ email: email });

        if (contractor && bcrypt.compareSync(password, contractor.password)) {
            const token = jwt.sign({
                id: contractor._id,
                userType: "Contractor"
            }, process.env.JWT_SECRET, {
                expiresIn: "24h"
            });

            res.status(200).json({ success: true, message: "Login Successful", contractor: contractor, token: token });

        } else if (supplier && bcrypt.compareSync(password, supplier.password)) {
            const token = jwt.sign({
                id: supplier._id,
                userType: "Supplier"
            }, process.env.JWT_SECRET, {
                expiresIn: "24h"
            });

            res.status(200).json({ success: true, message: "Login Successful", supplier: supplier, token: token });

        } else if (homeowner && bcrypt.compareSync(password, homeowner.password)) {
            let token = await homeowner.generateToken();

            res.status(200).json({ success: true, message: "Login Successful", token: token });

        } else {
            res.status(404).json({ message: 'Invalid Email Or Password' });
        };
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "User Login Failed",
        });
    }
};