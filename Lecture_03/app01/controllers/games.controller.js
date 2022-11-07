const mongoose=require("mongoose");
require("./../data/games-model");
const Game=mongoose.model(process.env.GAME_MODEL);

module.exports.getAll=function(req,res){
    console.log("GET All Received");
    let offset=0;
    let count=5;
    if(req.query && req.query.offset){
        offset=parseInt(req.query.offset);
    }
    if(req.query && req.query.count){
        count=parseInt(req.query.count);
    }

    Game.find().skip(offset).limit(count).exec(function(err,games){
        res.status(process.env.OK_STATUS_CODE).json(games);
    })
}

module.exports.getOne=function(req,res){
    const gameId=req.params.gameId;
    const validGameId=mongoose.isValidObjectId(gameId);
    if(validGameId){
        Game.findById(gameId).exec(function(err,games){
            const response={
                status: 200,
                message: games
            };
            if(err){
                response.status=process.env.ERROR_POST_CODE;
                response.message={message: "Error"};
            }
            else{
                if(games){
                    response.status=process.env.OK_STATUS_CODE;
                    response.message=games;
                }else{
                    response.status=process.env.NOT_FOUND_CODE;
                    response.message={message: "Requested game does not exists!"};
                }
            }
            res.status(response.status).json(response.message);
        })
    }
    else{
        res.status(process.env.ERROR_POST_CODE).json({message: "Not valid game id!"});
    }
}

module.exports.insertOne=function(req,res){
    console.log("POST One Received");
    let newGame={title,price,minPlayers,minAge}=req.body;

    Game.create(newGame,function(err,newGame){
        if(err){
            res.status(process.env.ERROR_POST_CODE).json({message: err});
        }
        res.status(process.env.OK_POST_CODE).json(newGame);
    });
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