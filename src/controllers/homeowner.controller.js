const { log } = require("winston");
const Homeowner = require("../models/homeowner.model");


module.exports.getHomeowner = async function(req, res, next){
    try {
        let homeowner = await Homeowner.findById(req.user.id).select("-password");
        if(!homeowner) throw new Error ("The homeowner with the provided ID doesn't exist");
        res.status(200).json({
            message : "Homeowner retreived successfully",
            data : homeowner
        });
    } catch (err) {
       next(err) 
    }
};

module.exports.updateHomeowner = async function(req, res, next){
    try {
        let homeowner = await Homeowner.findByIdAndUpdate(req.user.id, req.body, {new : true}).select("-password");
        if(!homeowner) throw new Error ("The homeowner with the provided ID doesn't exist");

        res.status(200).json({
            message : "Homeowner updated successfully",
            data : homeowner
        });
    } catch (err) {
       next(err) 
    }
};

module.exports.deleteHomeowner = async function(req, res, next){
    try {
        let homeowner = await Homeowner.findByIdAndDelete(req.user.id);
        if(!homeowner) throw new Error ("The homeowner with the provided ID doesn't exist");
        res.status(200).json({
            message : "Homeowner deleted successfully"
        });
    } catch (err) {
       next(err) 
    }
};

module.exports.uploadPhoto = async function(req, res, next){
    try {
        console.log("I was called");
        console.log(req)

        const profilePhoto = req.file;
        const profilePhotoUrl = profilePhoto.path;

        console.log(profilePhoto)
        console.log(profilePhotoUrl)
        
        let homeowner = await Homeowner.findByIdAndUpdate(req.user.id, {$set : req.body}, {new : true}).select("-password");
        if(!homeowner) throw new Error ("The homeowner with the provided ID doesn't exist");
        // res.status(200).json({
        //   message: "profilePhoto Uploaded Successfully",
        //   profilePhoto: profilePhotoUrl,
        // });
      } catch (err) {
            next(err);
      }
};