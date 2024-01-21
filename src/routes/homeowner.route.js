const express = require("express");
const homeownerRouter = express.Router();
const { signup, login } = require("../controllers/auth/honeowner.auth.controller");
const { getHomeowner, updateHomeowner } = require("../controllers/homeowner.controller");

homeownerRouter.post("/signup", signup);
homeownerRouter.post("/login", login);
homeownerRouter.get("/", getHomeowner);
homeownerRouter.patch("/update", updateHomeowner);
homeownerRouter.post("/logout");

module.exports = homeownerRouter;