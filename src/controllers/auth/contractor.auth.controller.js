const Contractor = require("../../models/contractor.model");
const Supplier = require("../../models/supplier.model");
const Homeowner = require("../../models/homeowner.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signup = async function(req, res){
    try {
        const { firstName, lastName, email, password, phoneNumber, address, city, state } = req.body;

        const contractorExists = await Contractor.exists({ email });
        const supplierExists = await Supplier.exists({ email });
        const homeownerExists = await Homeowner.exists({ email });
    
        if (contractorExists || supplierExists || homeownerExists) {
          return res.status(400).json({ message: 'Email already in use' });
        }

        const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
        const hash = bcrypt.hashSync(password, salt);
    
        const newContractor = new Contractor({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hash,
            phoneNumber: phoneNumber,
            businessAddress : address,
            state,
            city,
            userType: "Contractor"
        });

        await newContractor.save();
        res.status(200).json({
            success: true,
            message: "Contractor Registered Successfully",
            data: newContractor
          });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Contractor Registeration Failed",
          });
    }
};
