const jwt = require("jsonwebtoken");

const verifyToken = (useType) => async(req, res, next) => {
    const token = await req.headers.authorization.split(" ")[1];
    if(!token) {
        return res.status(401).json({
            message: "You are not authenticated"
        })
    };

    jwt.verify(token, process.env.JWT_SECRET, async(err, payload) => {u
        if(err) {
            return res.status(401).json({
                message: "Token is invalid"
            })
        };

        if(useType && payload.useType !== useType) {
            return res.status(403).json({
                message: "Forbidden. Invalid useType"
            })
        };
        req.user = payload;
        next();
    })
}

module.exports = {
    verifyToken
}