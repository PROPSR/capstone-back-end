const jwt = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (userType) => async(req, res, next) => {
    if(!req.headers.authorization) {
        return res.status(401).json({
            message: "Please provide a token"
        })
    };
    const token = await req.headers.authorization.split(" ")[1];
    if(!token) {
        return res.status(401).json({
            message: "You are not authenticated"
        })
    };

    jwt.verify(token, process.env.JWT_SECRET, async(err, payload) => {
        if(err) {
            return res.status(401).json({
                message: "Token is invalid"
            })
        };

        if(userType && payload.userType !== userType) {
            return res.status(403).json({
                message: "Forbidden. Invalid userType"
            });
        };
        req.user = payload;
        next();
    })
}

module.exports = {
    verifyToken
}