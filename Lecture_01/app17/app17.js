const express = require("express");

const app=express();

//const portNumber=3000;
app.set("port",3000);

const server=app.listen(app.get("port"),function(){
    console.log("Listening to port "+server.address().port);
    //console.log("Listening to port "+portNumber);
});
//app.listen(portNumber);

