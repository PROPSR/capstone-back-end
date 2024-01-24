const express = require("express");
const projectRouter = express.Router();
const { listProjects, getProject, createProject, updateProject, deleteProject } = require("../controllers/project.controller");

projectRouter.get("/", listProjects);
projectRouter.get("/:id", getProject);
projectRouter.post("/", createProject);
projectRouter.patch("/:id", updateProject);
projectRouter.delete("/:id", deleteProject);


module.exports = projectRouter;