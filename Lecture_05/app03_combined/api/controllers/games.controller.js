const mongoose=require("mongoose");
require("./../data/games-model");

const Game=mongoose.model(process.env.GAME_MODEL);


_runGeoQuery=function(req,res,offset,count){
    const {lat,lng}=req.query;
    const point={type: "Point",coordinates: [lng,lat]};

    let maxDistance=process.env.GEO_SEARCH_DEFAULT_MAX_DISTANCE;
    let minDistance=process.env.GEO_SEARCH_DEFAULT_MIN_DISTANCE;

    if(req.query && req.query.maxDist){
        maxDistance=parseInt(req.query.maxDist);
    }

    if(req.query && req.query.minDist){
        minDistance=parseInt(req.query.minDist);
    }

    const query={"publisher.location.coordinates":{
        $near: {
            $geometry: point,
            $maxDistance: maxDistance,
            $minDistance: minDistance
        }
    }};

    Game.find(query).skip(offset).limit(count).exec(function(err,games){
        if(err){
            console.error("Error in find games",err);
            res.status(500).json("Error");
        }
        else{
            console.error("Found Games");
            res.status(process.env.OK_STATUS_CODE).json(games);
        }
    })
}

module.exports.getAll=function(req,res){
    console.log("GET All Received");
    let offset=0;
    let count=5;
    let maxCount=20;
    
    if(req.query && req.query.offset){
        offset=parseInt(req.query.offset);
    }
    if(req.query && req.query.count){
        count=parseInt(req.query.count);
    }

    if(isNaN(offset) || isNaN(count)){
        res.status(400).json({message: "offset and count must be valid"});
        return;
    }

    if(count>maxCount){
        res.status(400).json({message: "count must be less than"+maxCount});
        return;
    }

    if(req.query && req.query.lat){
        _runGeoQuery(req,res,offset,count);
        return;
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