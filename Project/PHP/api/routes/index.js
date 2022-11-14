const express=require("express");
const moviesController=require("../controllers/movies.controller");
const castController=require("../controllers/cast.controller");
const router=express.Router();

router.route("/movies")
    .get(moviesController.getAll)
    .post(moviesController.insertOne);

router.route("/movies/:movieId")
    .get(moviesController.getOne)
    .put(moviesController.updateOne)
    .patch(moviesController.updateOnePartial)
    .delete(moviesController.deleteOne);

router.route("/movies/:movieId/cast")
    .get(castController.getAll)
    .post(castController.insertOne);

router.route("/movies/:movieId/cast/:castId")
    .get(castController.getOne)
    .put(castController.updateOne)
    .post(castController.insertOne)
    .patch(castController.updateOnePartial);

module.exports=router;