const express = require("express");
require('express-async-errors');
require("dotenv").config();
const {connectToMongoDB} = require("./src/models/index");
const router = require("./src/routes");
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const error = require("./src/middlewares/error");

const app = express();
connectToMongoDB();
app.use(cors({ origin: '*'}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", router);

app.get("/api", (req, res)=> res.status(200).send("Welcome to Prospr API"));
app.get("*", (req, res)=> res.status(404).send("Resource not found😥"));
app.use(error);


app.listen(PORT, ()=> console.log(`Server now running on Port ${PORT}`));