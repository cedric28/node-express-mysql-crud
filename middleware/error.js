module.exports = function(err,req,res,next){
    //log exception
    res.status(500).send({message: err.sqlMessage});
}