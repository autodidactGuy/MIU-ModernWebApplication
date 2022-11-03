const express=require("express");
const numberController=require("../controllers/numbers.controller");
const router=express.Router();

router.route("/:number")
    .get(numberController.divide);

module.exports=router;