const Homeowner = require("../../models/homeowner.model");
const _ = require("lodash");
const bcrypt = require("bcrypt");

module.exports.signup = async function(req, res, next){
    try {
        const {firstName, lastName, email, password, address, phoneNumber} = req.body
        let user = await Homeowner.findOne({email});
        if (user) throw new Error("Email already exists");

        let homeowner = await new Homeowner({
            firstName,
            lastName,
            email,
            password,
            address,
            phoneNumber,
            userType : "Homeowner"
        }).save();
        res.status(201).json({
            message: "Homeowner created successfully",
            data : _.pick(homeowner, ["firstName", "lastName", "email", "phoneNumber", "address", "userType", "profilePhoto"]),
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
        data : _.pick(user, ["firstName", "lastName", "email", "phoneNumber", "address", "userType", "profilePhoto"]),
        token
    })
   } catch (err) {
      next(err); 
   } 
};
