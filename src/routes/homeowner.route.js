const express = require("express");
const homeownerRouter = express.Router();
const { signup} = require("../controllers/auth/homeowner.auth.controller");
const { getHomeowner, updateHomeowner, deleteHomeowner, uploadPhoto, getOrder, getOrders,cancelOrder, createOrder, getProject, getProjects, deleteProject, confirmOrder, updateProject, assignContractor, search, filter } = require("../controllers/homeowner.controller");
const {validateHomeowner, validateHomeownerUpdate, validateOrder, validateProjectUpdate} = require("../middlewares/validation");
const {verifyToken} = require("../middlewares/jwt");
const {upload} = require("../config/multer");

homeownerRouter.get("/projects/filter", verifyToken("Homeowner"), filter);
homeownerRouter.post("/signup", validateHomeowner, signup);
homeownerRouter.get("/", verifyToken("Homeowner"), getHomeowner);
homeownerRouter.patch("/update", verifyToken("Homeowner"), validateHomeownerUpdate, updateHomeowner);
homeownerRouter.delete("/", verifyToken("Homeowner"), deleteHomeowner);
homeownerRouter.patch("/uploadphoto", verifyToken("Homeowner"), upload("homeowner").single("profilePhoto"), uploadPhoto);
homeownerRouter.get("/orders", verifyToken("Homeowner"), getOrders);
homeownerRouter.get("/orders/:id", verifyToken("Homeowner"), getOrder);
homeownerRouter.delete("/orders/:id", verifyToken("Homeowner"), cancelOrder);
homeownerRouter.post("/orders", verifyToken("Homeowner"), validateOrder, createOrder);
homeownerRouter.delete("/projects/:id", verifyToken("Homeowner"),deleteProject);
homeownerRouter.get("/projects",verifyToken("Homeowner"), getProjects);
homeownerRouter.get("/projects/:id",verifyToken("Homeowner"), getProject);
homeownerRouter.patch("/orders/:id/confirm",verifyToken("Homeowner"), confirmOrder);
homeownerRouter.patch("/projects/:id", verifyToken("Homeowner"), upload('project').array("images"), validateProjectUpdate, updateProject);
homeownerRouter.patch("/projects/:id/assign",verifyToken("Homeowner"), assignContractor);



module.exports = homeownerRouter;