const fs = require("fs");
const http=require("http");

const serveIndex=function(req,res){
    switch(req.url){//req.method
        case "/":
            let indexFileBuffer,statusCode;
            res.setHeader("Content-Type","text/html");
            res.writeHead(statusCode);
            res.end(indexFileBuffer);
            break;
        default:
            res.setHeader("Content-Type","text/html");
            res.writeHead(404);
            res.end("File Not Found!");
            break;
    }
}
fs.readFile("./index.html",function(err,buffer){
    if(err){
        indexFileBuffer="File not found!";
        statusCode=404;
    }
    else{
        indexFileBuffer=buffer;
        statusCode=200;
    }
    server.listen(8080,"localhost",function(){
        console.log("Server is running on http://localhost:8080")
    })
});

const server=http.createServer(serveIndex);




