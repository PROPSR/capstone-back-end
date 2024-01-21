const mongoose = require("mongoose");
require("dotenv").config();
const MONGO_CONNECTION_URL = process.env.MONGO_CONNECTION_URL;

module.exports.connectToMongoDB = function(){
    mongoose.connect(MONGO_CONNECTION_URL);
    mongoose.connection.on("connected", ()=> console.log("Connected to MongoDB successfully"));
    mongoose.connection.on("error", (err)=> console.log(err));
    mongoose.connection.on("diconnected", ()=> console.log("Disconnected..."));
};