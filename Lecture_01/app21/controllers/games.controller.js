const gamesData=require("../data/games.json");

module.exports.getAll=function(req,res){
    console.log("GET All Received");
    res.status(200).json(gamesData);
}

module.exports.getOne=function(req,res){
    console.log("GET One Requested");
    const gamesIndex=req.params.gameId;
    const theGame=gamesData[gamesIndex];
    res.status(200).json(theGame);
}