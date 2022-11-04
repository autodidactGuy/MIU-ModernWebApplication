const express=require("express");
const gamesController=require("../controllers/games.controller");
const router=express.Router();

router.route("/games")
    .get(gamesController.getAll);

router.route("/games/:gameId")
    .get(gamesController.getOne);

router.route("/games")
    .post(gamesController.insertOne)

router.route("/games/:gameId")
    .delete(gamesController.deleteOne)

module.exports=router;