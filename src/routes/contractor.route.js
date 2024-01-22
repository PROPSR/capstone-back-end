const express = require("express");
const contractorRouter = express.Router();
const {signup, login } = require("../controllers/auth/contractor.auth.controller");
const { getContractor, updateContractor } = require("../controllers/contractor.controller");
const { validateContractorSignup, validateLogin } = require("../middlewares/validation");
const { verifyToken } = require("../middlewares/jwt");

contractorRouter.post("/signup", validateContractorSignup, signup);
contractorRouter.post("/login", validateLogin, login);
contractorRouter.get("/", verifyToken("Contractor"), getContractor);
contractorRouter.patch("/update", verifyToken("Contractor"), updateContractor);
contractorRouter.post("/logout");

module.exports = contractorRouter;