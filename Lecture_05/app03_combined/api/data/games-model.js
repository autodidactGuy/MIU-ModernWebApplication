const mongoose=require("mongoose");

const publisherSchema=mongoose.Schema(
    {
        name: String,
        location: {
            coordinates: {
                type: [Number],//stores long than lat
                index: "2dsphere"
            }
        },
        country: String,
        established: Number,
    }
)
const gameSchema=mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        require: true
    },
    rate: {
        type: Number,
        required: false,
        min: 1,
        max: 5,
        default: 1
    },
    price: Number,
    minPlayers: Number,
    maxPlayers: Number,
    minAge: Number,
    designers: [ String ],
    publisher: publisherSchema
});

mongoose.model(process.env.GAME_MODEL,gameSchema,process.env.GAMES_COLLECTION);//mongoose.model("Game",gameSchema);