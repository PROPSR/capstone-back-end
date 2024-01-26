const { Router } = require("express");
const { verifyEmailVerificationOtp, resendEmailVerificationOtp } = require("../controllers/auth/otpl.auth.controller");
const otpRouter = Router();

otpRouter.post("/verifyemail", verifyEmailVerificationOtp);
otpRouter.post("/verifyemail/resend", resendEmailVerificationOtp);

module.exports = otpRouter;