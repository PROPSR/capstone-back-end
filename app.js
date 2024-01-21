const express = require("express");
const app = express();
require("dotenv").config();
const {connectToMongoDB} = require("./src/models/index");
const router = require("./src/routes");
const PORT = process.env.PORT || 4200;
const error = require("./src/middlewares/error");


connectToMongoDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(error);
app.use("/api/v1", router);

app.get("/api", (req, res)=> res.status(200).send("Welcome to Prospr API"));
app.get("*", (req, res)=> res.status(404).send("Resource not found😥"));


app.listen(PORT, ()=> console.log(`Server now running on Port ${PORT}`));