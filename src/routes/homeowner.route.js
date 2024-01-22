const express = require("express");
const homeownerRouter = express.Router();
const { signup, login } = require("../controllers/auth/homeowner.auth.controller");
const { getHomeowner, updateHomeowner } = require("../controllers/homeowner.controller");
const {validateHomeowner, validateLogin} = require("../middlewares/validation");
const {verifyToken} = require("../middlewares/jwt");



homeownerRouter.post("/signup", validateHomeowner, signup);
homeownerRouter.post("/login", validateLogin, login);
homeownerRouter.get("/", verifyToken("Homeowner"), getHomeowner);
homeownerRouter.patch("/update", verifyToken("Homeowner"), updateHomeowner);
homeownerRouter.post("/logout");

module.exports = homeownerRouter;