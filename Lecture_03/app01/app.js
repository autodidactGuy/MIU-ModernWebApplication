const express = require("express");
const path = require("path");
require("dotenv").config();

require("./data/db");

const routes=require("./routes");

const app=express();

app.use(function(req,res,next){
    console.log(req.method,req.url);
    next();
});

app.use("/api",function(req,res,next){
    res.header("Access-Control-Allow-Origin",'http://localhost');
    next();
});

app.use(express.static(path.join(__dirname,"public")));
app.use(express.json());
app.use(express.urlencoded({extened:true}));;;;;

app.use("/api",routes);

const server=app.listen(parseInt(process.env.PORT),function(){
    console.log(process.env.PORT_MESSAGE+server.address().port);
});