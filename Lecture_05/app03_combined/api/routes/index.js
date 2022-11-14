const express=require("express");
const gamesController=require("../controllers/games.controller");
const usersController=require("../controllers/users.controller");
const router=express.Router();

router.route("/games")
    .get(gamesController.getAll)
    .post(gamesController.insertOne);

router.route("/games/:gameId")
    .get(gamesController.getOne)
    .delete(gamesController.deleteOne);

router.route("/games/:gameId/publisher")
    .get(gamesController.getOne);

router.route("/users")
    .post(usersController.insertOne);
    
module.exports=router;