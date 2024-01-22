const Homeowner = require("../../models/homeowner.model");
const _ = require("lodash");
const bcrypt = require("bcrypt");

module.exports.signup = async function(req, res, next){
    try {
        let user = await Homeowner.findOne({email : req.body.email});
        if (user) throw new Error("Email already exists");

        let homeowner = await new Homeowner({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            email : req.body.email,
            password : req.body.password,
            address : req.body.address,
            phoneNumber : req.body.phoneNumber,
            userType : "Homeowner"
        }).save();
        res.status(201).json({
            message: "Homeowner created successfully",
            data : _.pick(homeowner, ["_id", "email", "firstName", "lastName", "address", "userType", "phoneNumber","profilePhoto"])
        });
    } catch (err) {
       next(err); 
    }
};

module.exports.login = async function(req, res, next){
   try {
    let user = await Homeowner.findOne({email : req.body.email});
    if (!user) throw new Error("Email doesn't exist, Please sign up");
    let validatedUser = await bcrypt.compare(req.body.password, user.password );
    if (!validatedUser) throw new Error ("Password is incorrect");

    let token = await user.generateToken();
    res.status(200).json({
        message : "User logged in successfully",
        data : _.pick(user, ["_id", "email", "firstName", "lastName", "address", "userType", "phoneNumber","profilePhoto"]),
        token
    })
   } catch (err) {
      next(err); 
   } 
};

module.exports.logout = async function(req, res, next){
    try {
 
    } catch (err) {
       next(err); 
    } 
 };