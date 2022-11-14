const mongoose=require("mongoose");

const Movie=mongoose.model(process.env.MOVIE_MODEL);

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

    Movie.find().skip(offset).limit(count).exec(function(err,movies){
        if(movies.length){
            res.status(process.env.OK_STATUS_CODE).json(movies);
        }
        else{
            res.status(process.env.NOT_FOUND_CODE).json({message: "No movies found!"});
        }
    })
}

module.exports.getOne=function(req,res){
    const movieId=req.params.movieId;
    const validMovieId=mongoose.isValidObjectId(movieId);
    if(validMovieId){
        Movie.findById(movieId).exec(function(err,movie){
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
                    response.status=process.env.OK_STATUS_CODE;
                    response.message=movie;
                }else{
                    response.status=process.env.NOT_FOUND_CODE;
                    response.message={message: "Requested movie does not exists!"};
                }
            }
            res.status(response.status).json(response.message);
        })
    }
    else{
        res.status(process.env.ERROR_POST_CODE).json({message: "Not valid movie id!"});
    }
}

module.exports.insertOne=function(req,res){
    console.log("POST One Received");
    let newMovie={title,year,director}=req.body;

    Movie.create(newMovie,function(err,newMovie){
        if(err){
            res.status(process.env.ERROR_POST_CODE).json({message: err.message});
        }
        res.status(process.env.OK_POST_CODE).json(newMovie);
    });
}

module.exports.deleteOne= function (req, res) {
    const movieId = req.params.movieId;
    Movie.findByIdAndRemove(movieId).exec(function (err, deletedMovie) {
        const response = { status: 201, message: { message: "Movie deleted successfully!" } };
        if (err) {
            console.log("Error finding movie");
            response.status = process.env.INTERNAL_SERVER_ERROR_CODE;
            response.message = err;
        } else if (!deletedMovie) {
            console.log("Movie id not found");
            response.status = process.env.NOT_FOUND_CODE;
            response.message = {
                "message": "Movie ID not found"
            };
        }
        res.status(response.status).json(response.message);
    });
}

module.exports.updateOne= function (req, res) {
    const movieId = req.params.movieId;
    let {title,year,director}=req.body;
    Movie.findById(movieId).exec(function (err, movie) {
        const response = { status: 200, message: movie };
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
            movie.title=title;
            movie.year=year;
            movie.director=director;
            movie.save(function(err, updatedMovie) {
                if (err) {
                    response.status = process.env.INTERNAL_SERVER_ERROR_CODE;
                    response.message= {message: err.message };
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

module.exports.updateOnePartial= function (req, res) {
    const movieId = req.params.movieId;
    let {title,year,director}=req.body;
    Movie.findById(movieId).exec(function (err, movie) {
        const response = { status: 200, message: movie };
        if (err) {
            console.log("Error finding movie");
            response.status = process.env.ERROR_POST_CODE;
            response.message = err;
        } else if (!movie) {
            console.log("Movie id not found");
            response.status = process.env.NOT_FOUND_CODE;
            response.message = {
                "message": "Movie ID not found"
            };
        }
        else{
            if(title){
                movie.title=title;
            }
            if(year){
                movie.year=year;
            }
            if(director){
                movie.director=director;
            }
            movie.save(function(err, updatedMovie) {
                const response= { status: 200, message: updatedMovie };
                if (err) {
                    response.status = process.env.ERROR_POST_CODE;
                    response.message= {message: err.message };
                } else {
                    response.status = process.env.OK_POST_CODE;
                    response.message= updatedMovie;
                }
            });
        }
        res.status(response.status).json(response.message);
    });
}