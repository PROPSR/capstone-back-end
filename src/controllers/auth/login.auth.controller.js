const Contractor = require("../../models/contractor.model");
const Supplier = require("../../models/supplier.model");
const Homeowner = require("../../models/homeowner.model");
const Otp = require("../../models/otp.model");
const { generateOtp } = require("../../utilities/otpGenerator");
const { passwordReset } = require("../../utilities/mails");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports.login = async function (req, res) {
    try {
        const { email, password } = req.body;

        const user = await Contractor.findOne({ email: email }) || await Supplier.findOne({ email: email }) || await Homeowner.findOne({ email: email });

        if (!user) {
            res.status(404).json({ message: "User Not Found" });
        } else if (user.isEmailVerified === false) {
            res.status(400).json({ success: false, message: "Email Not Verified" });
        } else {
            // Continue with the login logic based on the user type
            if (user instanceof Contractor) {
                if (bcrypt.compareSync(password, user.password)) {
                    const token = jwt.sign({
                        id: user._id,
                        userType: "Contractor"
                    }, process.env.JWT_SECRET, {
                        expiresIn: "24h"
                    });
                    res.status(200).json({ success: true, message: "Login Successful", token: token, userType: user.userType });
                } else {
                    res.status(401).json({ success: false, message: "Invalid Password" });
                }
            } else if (user instanceof Supplier) {
                if (bcrypt.compareSync(password, user.password)) {
                    const token = jwt.sign({
                        id: user._id,
                        userType: "Supplier"
                    }, process.env.JWT_SECRET, {
                        expiresIn: "24h"
                    });
                    res.status(200).json({ success: true, message: "Login Successful", token: token, userType: user.userType });
                } else {
                    res.status(401).json({ success: false, message: "Invalid Password" });
                }
            } else if (user instanceof Homeowner) {
                if (bcrypt.compareSync(password, user.password)) {
                    const token = jwt.sign({
                        id: user._id,
                        userType: "Homeowner"
                    }, process.env.JWT_SECRET, {
                        expiresIn: "24h"
                    });
                    res.status(200).json({ success: true, message: "Login Successful", token: token, userType: user.userType });
                } else {
                    res.status(401).json({ success: false, message: "Invalid Password" });
                }
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Login Failed",
        });
    }
};



module.exports.sendPasswordResetOtp = async function(req, res) {
    try {
        const {email} = req.body;

        const contractor = await Contractor.findOne({ email: email }).select("-password");
        const supplier = await Supplier.findOne({ email: email }).select("-password");
        const homeowner = await Homeowner.findOne({ email: email }).select("-password");
    
        if(contractor) {
            const otp = generateOtp();
            const newOtp = new Otp({
                userId: contractor._id,
                email: contractor.email,
                otp: otp,
                type: "Password-Reset",
                userType: "Contractor"
              });
              await newOtp.save();
              await passwordReset(newOtp.email, newOtp.otp);
              res.status(200).json({
                success: true,
                message: "Password Reset Mail Sent Successfully",
                data: contractor,
                otp: newOtp.otp
              });
        }else if(homeowner) {
            const otp = generateOtp();
            const newOtp = new Otp({
                userId: homeowner._id,
                email: homeowner.email,
                otp: otp,
                type: "Password-Reset",
                userType: "Homeowner"
              });
              await newOtp.save();
              await passwordReset(newOtp.email, newOtp.otp);
              res.status(200).json({
                success: true,
                message: "Password Reset Mail Sent Successfully",
                data: homeowner,
                otp: newOtp.otp
              });
        }else if(supplier) {
            const otp = generateOtp();
            const newOtp = new Otp({
                userId: supplier._id,
                email: supplier.email,
                otp: otp,
                type: "Password-Reset",
                userType: "Supplier"
              });
              await newOtp.save();
              await passwordReset(newOtp.email, newOtp.otp);
              res.status(200).json({
                success: true,
                message: "Password Reset Mail Sent Successfully",
                data: supplier,
                otp: newOtp.otp
              });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "User Not Found",
        });
    };
};

module.exports.resetPassword = async function(req, res) {
    try {
        const userId = req.params.id;

        const contractor = await Contractor.findById(userId).select("-password");
        const supplier = await Supplier.findById(userId).select("-password");
        const homeowner = await Homeowner.findById(userId).select("-password");
    
        if(contractor) {
            const {password} = req.body;
            const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
            const encryptedPassword = bcrypt.hashSync(password, salt);
            contractor.password = encryptedPassword;

            await contractor.save();
              res.status(200).json({
                success: true,
                message: "Password Reset Successful",
                data: contractor,
              });
        }else if(homeowner) {
            const {password} = req.body;
            const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
            const encryptedPassword = bcrypt.hashSync(password, salt);
            homeowner.password = encryptedPassword;

            await homeowner.save();
              res.status(200).json({
                success: true,
                message: "Password Reset Successful",
                data: homeowner,
              });
        }else if(supplier) {
            const {password} = req.body;
            const salt = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS));
            const encryptedPassword = bcrypt.hashSync(password, salt);
            supplier.password = encryptedPassword;

            await supplier.save();
              res.status(200).json({
                success: true,
                message: "Password Reset Successful",
                data: supplier,
              });
        }else {
            res.status(404).json({
                success: false,
                message: "User Not Found",
              });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Password Reset Failed",
        });
    };
};
