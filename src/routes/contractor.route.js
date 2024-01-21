const express = require("express");
const contractorRouter = express.Router();
const {signup, login } = require("../controllers/auth/contractor.auth.controller");
const { getContractor, updateContractor } = require("../controllers/contractor.controller");

contractorRouter.post("/signup", signup);
contractorRouter.post("/login", login);
contractorRouter.get("/", getContractor);
contractorRouter.patch("/update", updateContractor);
contractorRouter.post("/logout");

module.exports = contractorRouter;