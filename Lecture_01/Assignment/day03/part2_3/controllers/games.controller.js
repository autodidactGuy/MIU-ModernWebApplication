const gamesData=require("../data/games.json");
require("dotenv").config();

module.exports.getAll=function(req,res){
    console.log("GET All Received");
    res.status(process.env.OK_STATUS_CODE).json(gamesData);
}

module.exports.getOne=function(req,res){
    console.log("GET One Requested");
    const gamesIndex=req.params.gameId;
    const theGame=gamesData[gamesIndex];
    res.status(process.env.OK_STATUS_CODE).json(theGame);
}