const Homeowner = require("../../models/homeowner.model");
const Contractor = require("../../models/contractor.model");
const Supplier = require("../../models/supplier.model");
const _ = require("lodash");
const bcrypt = require("bcrypt");

module.exports.signup = async function(req, res, next){
    try {
        const {firstName, lastName, email, password, address, phoneNumber} = req.body
        const contractorExists = await Contractor.exists({ email });
        const supplierExists = await Supplier.exists({ email });
        const homeownerExists = await Homeowner.exists({ email });
    
        if (contractorExists || supplierExists || homeownerExists) {
          return res.status(400).json({ message: 'Email already in use' });
        }

        let homeowner = await new Homeowner({
            firstName,
            lastName,
            email,
            password,
            address,
            phoneNumber,
            userType : "Homeowner"
        }).save();
        res.status(201).json({
            message: "Homeowner created successfully",
            data : _.pick(homeowner, ["firstName", "lastName", "email", "phoneNumber", "address", "userType", "profilePhoto", "_id"]),
        });
    } catch (err) {
       next(err); 
    }
};


