const express = require("express");
const path = require("path");
require("dotenv").config();

const app=express();

app.get("/",function(req,res){
    console.log("GET received");
    res.status(200).send("Received your GET request!");
});

app.get("/json",function(req,res){
    console.log("GET received");
    res.status(200).send({ "JSON Data": true });
});

app.get("/file",function(req,res){
    console.log("File request received");
    //console.log(__dirname);
    res.status(200).sendFile(path.join(__dirname,"index.html"));
});

const server=app.listen(process.env.PORT,function(){
    console.log(process.env.PORT_MESSAGE+server.address().port);
});