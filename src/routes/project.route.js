const express = require("express");
const projectRouter = express.Router();
const {verifyToken} = require("../middlewares/jwt");
const {validateProjectCreation, validateProjectUpdate} = require("../middlewares/validation");
const { listProjects, getProject, projectsMarketplace, createProject, updateProject, deleteProject, getHomeownerProject, listHomeownerProjects } = require("../controllers/project.controller");

projectRouter.get("/", listProjects);
projectRouter.get("/:id", getProject);
projectRouter.get("/marketplace",verifyToken("Homeowner"), projectsMarketplace);
projectRouter.get("/homeowner",verifyToken("Homeowner"), listHomeownerProjects);
projectRouter.get("/homeowner",verifyToken("Homeowner"), getHomeownerProject);
projectRouter.post("/", verifyToken("Homeowner"), validateProjectCreation, createProject);
projectRouter.patch("/:id", verifyToken("Homeowner"), validateProjectUpdate, updateProject);
projectRouter.delete("/:id", verifyToken("Homeowner"),deleteProject);


module.exports = projectRouter;