const express = require("express");
const path = require("path");
require("dotenv").config();

const app=express();

app.post("*",function(req,res){
    res.json({"JSON Data": true});
});

app.use(express.static(path.join(__dirname,"public")));

app.get("*",function(req,res){
    res.status(process.env.NOT_FOUND_STATUS_CODE).send(process.env.NOT_FOUND_MESSAGE);
});

const server=app.listen(parseInt(process.env.PORT),function(){
    console.log(process.env.PORT_MESSAGE+server.address().port);
});