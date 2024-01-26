const { Router } = require("express");
const { login, sendPasswordResetOtp, resetPassword } = require("../controllers/auth/login.auth.controller");
const { validateLogin } = require("../middlewares/validation");
const loginRouter = Router();

loginRouter.post("/login", validateLogin, login);
loginRouter.post("/sendpasswordresetotp", sendPasswordResetOtp);
loginRouter.patch("/resetpassword/:id", resetPassword);


module.exports = loginRouter;
