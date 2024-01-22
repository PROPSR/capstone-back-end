const Contractor = require("../../models/contractor.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.signup = async function(req, res){
    try {
        const { firstName, lastName, email, password, phoneNumber } = req.body;
    
        const user = await Contractor.findOne({ email: email});
        if(user) {
            return res.status(400).json({
                message: "Email Already In Use"
            });
        };
        const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
        const hash = bcrypt.hashSync(password, salt);
    
        const newContractor = new Contractor({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hash,
            phoneNumber: phoneNumber,
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

module.exports.login = async function(req, res){
    try {
        const { email, password } = req.body;

        const contractor = await Contractor.findOne({ email: email});
    
        if(!contractor) {
            return res.status(404).json({
                success: false,
                message: "contractor Not found"
            })
        }
        const matchedPassword = bcrypt.compareSync(password, contractor.password);
        if(!matchedPassword) {
            console.log("Password is Incorrect");
            res.status(400).json({
                message: "Wrong Email or Password"
            });
        };
    
        const token = jwt.sign({
            id: contractor._id,
            useType: "Contractor"
        }, process.env.JWT_SECRET, {
            expiresIn : "24h"
        });
    
        res.status(200).json({
            success: true,
            message: "Login Successful",
            data: contractor,
            token: token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
          success: false,
          message: "Contractor Login Failed",
        });
    }
};