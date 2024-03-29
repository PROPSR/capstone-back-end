const Contractor = require("../../models/contractor.model");
const Supplier = require("../../models/supplier.model");
const Homeowner = require("../../models/homeowner.model");
const Otp = require("../../models/otp.model");
const { generateOtp } = require("../../utilities/otpGenerator");
const {emailVerification } = require("../../utilities/mails");
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

        const otp = generateOtp();
        const newOtp = new Otp({
          userId: newContractor._id,
          email: newContractor.email,
          otp: otp,
          type: "Email-Verification",
          userType: "Contractor"
        });
        await newOtp.save();
        await emailVerification(newOtp.email, newOtp.otp);

        res.status(200).json({
            success: true,
            message: "Contractor Registered Successfully",
            data: newContractor,
            otp: newOtp.otp
          });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Contractor Registeration Failed",
          });
    }
};
