const express = require("express");
const contractorRouter = express.Router();
const {signup } = require("../controllers/auth/contractor.auth.controller");
const { getContractor, updateContractor, uploadProfilePhoto, getAssignedProject, getAssignedProjects } = require("../controllers/contractor.controller");
const { validateContractorSignup, validateContractorUpdate } = require("../middlewares/validation");
const { verifyToken } = require("../middlewares/jwt");
const { upload } = require("../config/multer");

contractorRouter.post("/signup", validateContractorSignup, signup);
contractorRouter.get("/", verifyToken("Contractor"), getContractor);
contractorRouter.patch("/upload", verifyToken("Contractor"), upload("contractor").single("profilePhoto"), uploadProfilePhoto);
contractorRouter.patch("/update", verifyToken("Contractor"), validateContractorUpdate, updateContractor);
contractorRouter.post("/logout");
contractorRouter.get("/projects", verifyToken("Contractor"), getAssignedProjects);
contractorRouter.get("/projects/:id", verifyToken("Contractor"), getAssignedProject);

module.exports = contractorRouter;