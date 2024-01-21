module.exports = function(error, req, res, next){
    res.status(500).json({
        message : "Oops😥, an error occured",
        data : error.message
    })
};