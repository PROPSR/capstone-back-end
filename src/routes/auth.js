const express = require("express");
const userRouter = express.Router();
const authController = require("../controllers/auth");

userRouter.post("/signup", authController.signup);
userRouter.post("/login");
userRouter.post("/logout");

module.exports = userRouter;