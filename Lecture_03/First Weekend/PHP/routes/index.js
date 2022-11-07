const express=require("express");
const moviesController=require("../controllers/movies.controller");
const castController=require("../controllers/cast.controller");
const router=express.Router();

router.route("/movies")
    .get(moviesController.getAll);

router.route("/movies/:movieId")
    .get(moviesController.getOne);

router.route("/movies")
    .post(moviesController.insertOne)

router.route("/movies/:movieId")
    .delete(moviesController.deleteOne)

router.route("/movies/:movieId")
    .put(moviesController.updateOne)
router.route("/movies/:movieId")
    .patch(moviesController.updateOnePartial)

router.route("/movies/:movieId/cast")
    .get(castController.getAll);
router.route("/movies/:movieId/cast/:castId")
    .get(castController.getOne);
router.route("/movies/:movieId/cast")
    .post(castController.insertOne);
router.route("/movies/:movieId/cast/:castId")
    .delete(castController.deleteOne);

router.route("/movies/:movieId/cast/:castId")
    .put(castController.updateOne);

router.route("/movies/:movieId/cast/:castId")
    .patch(castController.updateOnePartial)

module.exports=router;