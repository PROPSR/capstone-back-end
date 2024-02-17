const Homeowner = require("../../models/homeowner.model");
const Contractor = require("../../models/contractor.model");
const Supplier = require("../../models/supplier.model");
const _ = require("lodash");
const Otp = require("../../models/otp.model");
const { generateOtp } = require("../../utilities/otpGenerator");
const {emailVerification } = require("../../utilities/mails");
const bcrypt = require("bcrypt");

module.exports.signup = async function(req, res, next){
    try {
        const {firstName, lastName, email, password, address, phoneNumber, city, state} = req.body
        const contractorExists = await Contractor.exists({ email });
        const supplierExists = await Supplier.exists({ email });
        const homeownerExists = await Homeowner.exists({ email });
    
        if (contractorExists || supplierExists || homeownerExists) {
          return res.status(400).json({ message: 'Email already in use' });
        }
        const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
        const hash = bcrypt.hashSync(password, salt);

        let homeowner = await new Homeowner({
            firstName,
            lastName,
            email,
            password: hash,
            address,
            city,
            state,
            phoneNumber,
            userType : "Homeowner"
        }).save();

        const otp = generateOtp();
        const newOtp = new Otp({
          userId: homeowner._id,
          email: homeowner.email,
          otp: otp,
          type: "Email-Verification",
          userType: "Homeowner"
        });
        await newOtp.save();
        await emailVerification(newOtp.email, newOtp.otp);

        res.status(201).json({
            message: "Homeowner created successfully",
            data : _.pick(homeowner, ["firstName", "lastName", "email", "phoneNumber", "address", "userType", "profilePhoto", "_id", "city", "state"]),
            otp: newOtp.otp
        });
    } catch (err) {
       next(err); 
    }
};


