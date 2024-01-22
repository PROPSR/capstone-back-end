const winston = require("winston");

const logger = winston.createLogger({
    level : "error",
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.File({ filename: 'logger.log', level: 'error' }),
        new winston.transports.Console({colorize:true, prettyPrint : true})
      ]
});

//Catch unhandled exceptions
process.on("uncaughtException", (err)=>{
    logger.error(err.message, err);
    process.exit(1);
});

//Catch rejected promises
process.on("unhandledRejection", (err)=>{
    logger.error(err.message, err);
    process.exit(1);
});

module.exports = function(error, req, res, next){
    logger.error(error.message, error);
    res.status(500).json({
        message : "Oops😥, an error occured",
        data : error.message
    })
};