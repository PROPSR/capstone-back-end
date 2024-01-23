const express = require("express");
const homeownerRouter = express.Router();
const { signup, login } = require("../controllers/auth/homeowner.auth.controller");
const { getHomeowner, updateHomeowner, deleteHomeowner, uploadPhoto } = require("../controllers/homeowner.controller");
const {validateHomeowner, validateLogin, validateHomeownerUpdate} = require("../middlewares/validation");
const {verifyToken} = require("../middlewares/jwt");
const {upload} = require("../config/multer");



homeownerRouter.post("/signup", validateHomeowner, signup);
homeownerRouter.post("/login", validateLogin, login);
homeownerRouter.get("/", verifyToken("Homeowner"), getHomeowner);
homeownerRouter.patch("/update", verifyToken("Homeowner"), validateHomeownerUpdate, updateHomeowner);
homeownerRouter.post("/logout");
homeownerRouter.delete("/", verifyToken("Homeowner"), deleteHomeowner);
homeownerRouter.patch("/uploadphoto", verifyToken("Homeowner"), upload("homeowner").single("profilePhoto"), uploadPhoto);

module.exports = homeownerRouter;