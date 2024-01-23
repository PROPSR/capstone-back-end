const express = require("express");
const mongoose = require("mongoose")
require("dotenv").config();
mongoose.connect(
    process.env.MONGO_CONNECTION_URL
).then(() => {
    console.log("Database Connection successful");
}).catch(err => {
    console.log(err);
})
const {connectToMongoDB} = require("./src/models/index");
const app = express();
const router = require("./src/routes");
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const error = require("./src/middlewares/error");


connectToMongoDB();
app.use(cors({ origin: '*'}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1", router);

app.get("/api", (req, res)=> res.status(200).send("Welcome to Prospr API"));
app.get("*", (req, res)=> res.status(404).send("Resource not found😥"));
app.use(error);


app.listen(PORT, ()=> console.log(`Server now running on Port ${PORT}`));