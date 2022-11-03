require("dotenv").config();

module.exports.divide=function(req,res){
    console.log("GET DIVIDE REQUESTED");
    const number1=req.params.number;
    if(req.query.number){
        const number2=parseInt(req.query.number);
        const result=number1/number2;
        res.status(process.env.OK_STATUS_CODE).send(result.toString());
    } else{
        res.status(process.env.ERROR_CODE).send(process.env.DIVIDE_ERROR_MESSAGE)
    }
}