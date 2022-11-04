const { ObjectId } = require("mongodb");
const dbConnection=require("../data/dbconnection");

module.exports.getAll=function(req,res){
    console.log("GET All Received");
    let offset=0;
    let count=4;
    if(req.query && req.query.offset){
        offset=parseInt(req.query.offset);
    }
    if(req.query && req.query.count){
        count=parseInt(req.query.count);
        if(count>7){
            count=7;
        }
    }
    const db=dbConnection.get();
    const gamesCollection=db.collection("games");
    gamesCollection.find().skip(offset).limit(count).toArray(function(err,games){
        res.status(process.env.OK_STATUS_CODE).json(games);
    })
}

module.exports.getOne=function(req,res){
    console.log("GET One Received");
    const gameId=req.params.gameId;
    const db=dbConnection.get();
    const gamesCollection=db.collection("games");
    gamesCollection.findOne({"_id": ObjectId(gameId)},function(err,game){
        res.status(process.env.OK_STATUS_CODE).json(game);
    });
}

module.exports.insertOne=function(req,res){
    console.log("POST One Received");
    let {title,price,minPlayers,minAge}=req.body;
    if(title && price && minPlayers && minAge){
        price=parseInt(price);
        minPlayers=parseInt(minPlayers);
        minAge=parseInt(minAge);
        if(minPlayers<1 || minPlayers>11){
            res.status(process.env.ERROR_POST_CODE).json({message: "Minimum Players must be from 1 - 11"});
            return;
        }
        if(minAge<6 || minAge>99){
            res.status(process.env.ERROR_POST_CODE).json({message: "Minimum Age must be from 6 - 99"});
            return;
        }
        const db=dbConnection.get();
        const gamesCollection=db.collection("games");
        gamesCollection.insertOne({title: title, price: price, minPlayers, minPlayers, minAge: minAge },function(err,newGame){
            res.status(process.env.OK_POST_CODE).json(newGame);
        });
    }else{
        res.status(process.env.ERROR_POST_CODE).json({message: "Invalid POST Request"});
    }
}

module.exports.deleteOne=function(req,res){
    console.log("DELETE One Received");
    const gameId=req.params.gameId;
    const db=dbConnection.get();
    const gamesCollection=db.collection("games");
    gamesCollection.deleteOne({"_id": ObjectId(gameId)},function(err,deletedGame){
        res.status(process.env.OK_STATUS_CODE).json(deletedGame);
    });
}