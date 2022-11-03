const express = require("express");
const path = require("path");
require("dotenv").config();

const app=express();

app.use(function(req,res,next){
    console.log(req.method,req.url);
    next();
})

app.get("/json",function(req,res){
    console.log("GET received");
    res.status(process.env.OK_STATUS_CODE).send({ "JSON Data": true });
});

app.use(express.static(path.join(__dirname,"public")));

//subsetRoute
//app.use("/public",express.static(path.join(__dirname,"public")));

const server=app.listen(process.env.PORT,function(){
    console.log(process.env.PORT_MESSAGE+server.address().port);
});