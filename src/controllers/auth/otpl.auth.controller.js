const Contractor = require("../../models/contractor.model");
const Supplier = require("../../models/supplier.model");
const Homeowner = require("../../models/homeowner.model");
const { generateOtp } = require("../../utilities/otpGenerator");
const {emailVerification, passwordReset } = require("../../utilities/mails");
const Otp = require("../../models/otp.model");

module.exports.verifyEmailVerificationOtp = async function(req, res) {
    try {
        // const userId = req.params.id;
        const { otp, email } = req.body;

        const otpCode = await Otp.findOne({email: email, otp: otp, type: "Email-Verification"}).sort({createdAt: -1});
        if(!otpCode) {
            return res.status(401).json({
                success: false,
                message: "otp code not found"
            });
        };
        if(otpCode.userType === "Contractor") {
            const contractor = await Contractor.findById(otpCode.userId).select("-password")
            contractor.isEmailVerified = true;
            await contractor.save();
            res.status(200).json({
                success: true,
                message: "Email Verified",
                user: contractor
            });
        }else if(otpCode.userType === "Supplier") {
            const supplier = await Supplier.findById(otpCode.userId).select("-password")
            supplier.isEmailVerified = true;
            await supplier.save();
            res.status(200).json({
                success: true,
                message: "Email Verified",
                user: supplier
            });
        }else if(otpCode.userType === "Homeowner") {
            const homeowner = await Homeowner.findById(otpCode.userId).select("-password")
            homeowner.isEmailVerified = true;
            await homeowner.save();
            res.status(200).json({
                success: true,
                message: "Email Verified",
                user: homeowner
            });
        };
        await Otp.deleteOne({ _id: otpCode._id });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Email Verification Failed",
        });
    };
};

module.exports.verifyPasswordResetOtp = async function(req, res) {
    try {
        const userId = req.params.id
        const { otp } = req.body;

        const otpCode = await Otp.findOne({userId: userId, otp: otp, type: "Password-Reset"}).sort({createdAt: -1});
        if(!otpCode) {
            return res.status(404).json({
                success: false,
                message: "otp code not found"
            });
        };
        await Otp.deleteOne({ _id: otpCode._id });
        res.status(200).json({
            success: true,
            message: "OTP verified successfully.",
          });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "OTP Verification Failed",
        });
    };
};

module.exports.resendEmailVerificationOtp = async function(req, res) {
    try {
        const userId = req.params.id;

        const contractor = await Contractor.findById(userId);
        const supplier = await Supplier.findById(userId);
        const homeowner = await Homeowner.findById(userId);
    
        if(contractor) {
            const otp = generateOtp();
            const newOtp = new Otp({
                userId: contractor._id,
                email: contractor.email,
                otp: otp,
                type: "Email-Verification",
                userType: "Contractor"
            });
            await newOtp.save();
            await emailVerification(newOtp.email, newOtp.otp);
            res.status(200).json({
                success: true,
                message: "Otp Resent Successfully",
                otp: newOtp.otp
            });
        }else if (supplier) {
            const otp = generateOtp();
            const newOtp = new Otp({
                userId: supplier._id,
                email: supplier.email,
                otp: otp,
                type: "Email-Verification",
                userType: "Supplier"
            });
            await newOtp.save();
            await emailVerification(newOtp.email, newOtp.otp);
            res.status(200).json({
                success: true,
                message: "Otp Resent Successfully",
                otp: newOtp.otp
            });
        }else if (homeowner) {
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
            res.status(200).json({
                success: true,
                message: "Otp Resent Successfully",
                otp: newOtp.otp
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Otp Resend Failed",
        });
    };
};

module.exports.resendPasswordResetOtp = async function(req, res) {
    try {
        const userId = req.params.id;

        const contractor = await Contractor.findById(userId);
        const supplier = await Supplier.findById(userId);
        const homeowner = await Homeowner.findById(userId);
    
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
                message: "Otp Resent Successfully",
                otp: newOtp.otp
            });
        }else if (supplier) {
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
                message: "Otp Resent Successfully",
                otp: newOtp.otp
            });
        }else if (homeowner) {
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
                message: "Otp Resent Successfully",
                otp: newOtp.otp
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Otp Resend Failed",
        });
    };
};
