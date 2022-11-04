const gamesData=require("../data/games.json");
const dbConnection=require("../dbconnection");

module.exports.getAll=function(req,res){
    console.log("GET All Received");

    let offset=0;
    let count=5;
    if(req.query && req.query.offset){
        offset=req,query.offset;
    }

    if(req.query && req.query.count){
        count=req,query.count;
    }

    const db=dbConnection.get();
    const gamesCollection=db.collection("games");
    gamesCollection.find().skip(offset).limit(count).toArray(function(err,games){
        //console.log("found games: ",games);
        res.status(process.env.OK_STATUS_CODE).json(games);
    })
    //console.log("db",db);
}

module.exports.getOne=function(req,res){
    console.log("GET One Requested");
    const gamesIndex=req.params.gameId;
    const theGame=gamesData[gamesIndex];
    res.status(200).json(theGame);
}