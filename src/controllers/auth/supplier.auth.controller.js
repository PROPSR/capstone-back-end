const Supplier = require("../../models/supplier.model");
const Contractor = require("../../models/contractor.model");
const Homeowner = require("../../models/homeowner.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


module.exports.signup = async function(req, res){
    try {
        const { firstName, lastName, phoneNumber, email, password, address, state, city } = req.body;
        if (!(firstName && lastName && phoneNumber && email && password)) {
            return res.status(400).send(`All fields are mandatory`);
          }

          const contractorExists = await Contractor.exists({ email });
          const supplierExists = await Supplier.exists({ email });
          const homeownerExists = await Homeowner.exists({ email });
      
          if (contractorExists || supplierExists || homeownerExists) {
            return res.status(400).json({ message: 'Email already in use' });
          }

        //hash password
        const hashedPassword = bcrypt.hashSync(req.body.password, 10);

        const newSupplier = new Supplier({
            firstName: firstName,
            lastName: lastName,
            phoneNumber: phoneNumber,
            email: email,
            password: hashedPassword,
            businessAddress:address,
            state,
            city,
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
