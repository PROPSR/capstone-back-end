const { Router } = require("express");
const { login } = require("../controllers/auth/login.auth.controller");
const { validateLogin } = require("../middlewares/validation");
const loginRouter = Router();

loginRouter.post("/login", validateLogin, login);

module.exports = loginRouter;