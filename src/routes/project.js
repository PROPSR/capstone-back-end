const express = require("express");
const projectRouter = express.Router();
const projectController = require("../controllers/project");

projectRouter.get("/", projectController.getProjects);
projectRouter.get("/:id", projectController.getProject);
projectRouter.post("/", projectController.createProject);
projectRouter.patch("/:id", projectController.updateProject);
projectRouter.delete("/:id", projectController.deleteProject);


module.exports = projectRouter;