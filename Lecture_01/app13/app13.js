const fs = require("fs");
const http=require("http");
let indexFileBuffer;
const serveIndex=function(req,res){
    res.setHeader("Content-Type","text/html");
    res.writeHead(200);
    res.end(indexFileBuffer);
}
fs.readFile("./index.html",function(err,buffer){
    indexFileBuffer=buffer;
    server.listen(8080,"localhost",function(){
        console.log("Server is running on http://localhost:8080")
    })
});

const server=http.createServer(serveIndex);




