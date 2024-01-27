const { Router } = require("express");
const { verifyEmailVerificationOtp, verifyPasswordResetOtp, resendEmailVerificationOtp, resendPasswordResetOtp } = require("../controllers/auth/otpl.auth.controller");
const otpRouter = Router();

otpRouter.post("/verifyemail/:id", verifyEmailVerificationOtp);
otpRouter.post("/verifyemail/resend/:id", resendEmailVerificationOtp);
otpRouter.post("/verifypasswordreset/:id", verifyPasswordResetOtp);
otpRouter.post("/verifypasswordreset/resend/:id", resendPasswordResetOtp);


module.exports = otpRouter;