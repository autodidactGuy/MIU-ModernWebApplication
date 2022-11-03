const express = require("express");
require("dotenv").config();
const routes=require("./routes");

const app=express();

app.use(function(req,res,next){
    console.log(req.method,req.url);
    next();
});

app.use(routes);

const server=app.listen(parseInt(process.env.PORT),function(){
    console.log(process.env.PORT_MESSAGE+server.address().port);
});