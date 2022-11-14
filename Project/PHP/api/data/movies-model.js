const mongoose=require("mongoose");

const castSchema=new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    activeSince:{
        type: Number,
        required: true
    }
});

const movieSchema=mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    cast: [ castSchema ]
});

mongoose.model(process.env.MOVIE_MODEL,movieSchema,process.env.MOVIE_COLLECTION);//mongoose.model("Movie",movieSchema);