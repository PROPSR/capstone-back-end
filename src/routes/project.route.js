const express = require("express");
const projectRouter = express.Router();
const {verifyToken} = require("../middlewares/jwt");
const {validateProjectCreation} = require("../middlewares/validation");
const { listProjects, getProject, projectsMarketplace, createProject} = require("../controllers/project.controller");

projectRouter.get("/", listProjects);
projectRouter.get("/:id", getProject);
projectRouter.get("/marketplace", projectsMarketplace);
projectRouter.post("/", verifyToken("Homeowner"), validateProjectCreation, createProject);

module.exports = projectRouter;