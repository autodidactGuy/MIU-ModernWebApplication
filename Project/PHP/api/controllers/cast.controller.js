const mongoose=require("mongoose");

const Movie=mongoose.model(process.env.MOVIE_MODEL);

module.exports.getAll=function(req,res){
    console.log("GET All Received");
    const movieId= req.params.movieId;

    let offset=0;
    let count=5;
    if(req.query && req.query.offset){
        offset=parseInt(req.query.offset);
    }
    if(req.query && req.query.count){
        count=parseInt(req.query.count);
    }

    Movie.findById(movieId).select("cast").skip(offset).limit(count).exec(function(err,movie){
        if(movie.cast.length){
            res.status(process.env.OK_STATUS_CODE).json(movie.cast);
        }
        else{
            res.status(process.env.NOT_FOUND_CODE).json({message: "No cast found!"});
        }
    })
}

module.exports.getOne=function(req,res){
    const movieId=req.params.movieId;
    const castId=req.params.castId;
    const validMovieId=mongoose.isValidObjectId(movieId);
    const validCastId=mongoose.isValidObjectId(castId);
    if(validMovieId && validCastId){
        Movie.findById(movieId).select("cast").exec(function(err,movie){
            const response={
                status: 200,
                message: movie
            };
            if(err){
                response.status=process.env.ERROR_POST_CODE;
                response.message={message: "Error"};
            }
            else{
                if(movie){
                    let cast=movie.cast.id(castId);
                    response.status=process.env.OK_STATUS_CODE;
                    response.message=cast;
                }else{
                    response.status=process.env.NOT_FOUND_CODE;
                    response.message={message: "Requested movie does not exists!"};
                }
            }
            res.status(response.status).json(response.message);
        })
    }
    else{
        res.status(process.env.ERROR_POST_CODE).json({message: "Not valid movie or cast id!"});
    }
}

const _addCast=function(req,res,movie){
    let newCast ={name,activeSince}=req.body;
    movie.cast.push(newCast);
    movie.save(function(err, updatedMovie) {
        const response= { status: process.env.OK_STATUS_CODE, message: [] };
        if (err) {
            response.status= process.env.OK_STATUS_CODE;
            response.message= {message: err.message };
        } else {
            response.status= process.env.OK_POST_CODE;
            response.message= updatedMovie.cast;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.insertOne= function(req, res) {
    const movieId= req.params.movieId;
    Movie.findById(movieId).select("cast").exec(function(err, movie) {
        console.log("Found movie ", movie);
        const response= { status: 200, message: movie };
        if (err) {
            console.log("Error finding movie");
            response.status= 500;
            response.message= err;
        } else if (!movie) {
            console.log("Error finding movie");
            response.status= 404;
            response.message= {"message": "Movie ID not found "+movieId};
        }
        if (movie) {
            _addCast(req, res, movie);
            return;
        }
        res.status(response.status).json(response.message);
    });
}


module.exports.deleteOne= function (req, res) {
    const movieId = req.params.movieId;
    const castId = req.params.castId;
    const validMovieId=mongoose.isValidObjectId(movieId);
    const validCastId=mongoose.isValidObjectId(castId);
    if(validMovieId && validCastId){
        Movie.findById(movieId).select("cast").exec(function(err,movie){
            const response={
                status: 200,
                message: movie
            };
            if(err){
                response.status=process.env.ERROR_POST_CODE;
                response.message={message: "Error"};
            }
            else{
                if(movie){
                    let cast=movie.cast.id(castId);
                    console.log(cast);
                    //need to delete this from here
                    movie.cast=movie.cast.filter(function(cast){
                        if(cast._id!=castId){
                            return cast;
                        }
                    });
                    movie.save(function(err,updatedMovie){
                        const response= { status: 200, message: updatedMovie };
                        if (err) {
                            response.status = process.env.INTERNAL_SERVER_ERROR_CODE;
                            response.message= err;
                        } else {
                            response.status = process.env.OK_POST_CODE;
                            response.message= updatedMovie;
                        }
                    });
                }else{
                    response.status=process.env.NOT_FOUND_CODE;
                    response.message={message: "Requested movie does not exists!"};
                }
            }
            res.status(response.status).json(response.message);
        })
    }
    else{
        res.status(process.env.ERROR_POST_CODE).json({message: "Not valid movie or cast id!"});
    }
}

module.exports.updateOne= function (req, res) {
    const movieId = req.params.movieId;
    const castId=req.params.castId;
    let {name,activeSince}=req.body;
    Movie.findById(movieId).select("cast").exec(function (err, movie) {
        const response = { status: 201, message: movie };
        if (err) {
            console.log("Error finding movie");
            response.status = process.env.INTERNAL_SERVER_ERROR_CODE;
            response.message = err;
        } else if (!movie) {
            console.log("Movie id not found");
            response.status = process.env.NOT_FOUND_CODE;
            response.message = {
                "message": "Movie ID not found"
            };
        }
        else{
            let cast=movie.cast.id(castId);
            console.log(cast);
            movie.cast=movie.cast.map(function(cast){
                if(cast._id==castId){
                    cast.name=name;
                    cast.activeSince=activeSince;
                }
                return cast;
            });
            movie.save(function(err,updatedMovie){
                if(err) {
                    response.status = process.env.ERROR_POST_CODE;
                    response.message= { message: err.message };
                } else {
                    response.status = process.env.OK_POST_CODE;
                    response.message= updatedMovie;
                }
                res.status(response.status).json(response.message);
            });
            return;
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.updateOnePartial=function (req, res) {
    const movieId = req.params.movieId;
    const castId=req.params.castId;
    let {name,activeSince}=req.body;
    Movie.findById(movieId).select("cast").exec(function (err, movie) {
        const response = { status: 201, message: movie };
        if (err) {
            console.log("Error finding movie");
            response.status = process.env.INTERNAL_SERVER_ERROR_CODE;
            response.message = err;
        } else if (!movie) {
            console.log("Movie id not found");
            response.status = process.env.NOT_FOUND_CODE;
            response.message = {
                "message": "Movie ID not found"
            };
        }
        else{
            let cast=movie.cast.id(castId);
            console.log(cast);
            movie.cast=movie.cast.map(function(cast){
                if(cast._id==castId){
                    if(name){
                        cast.name=name;
                    }
                    if(activeSince){
                        cast.activeSince=activeSince;
                    }
                }
                return cast;
            });
            movie.save(function(err,updatedMovie){
                if(err) {
                    response.status = process.env.ERROR_POST_CODE;
                    response.message= { message: err.message };
                } else {
                    response.status = process.env.OK_POST_CODE;
                    response.message= updatedMovie;
                }
                res.status(response.status).json(response.message);
            });
            return;
        }
        res.status(response.status).json(response.message);
    });
}