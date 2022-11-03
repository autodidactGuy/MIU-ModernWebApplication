const fs = require("fs");
const http=require("http");

const serveIndex=function(req,res){
    res.setHeader("Content-Type","text/html");
    res.writeHead(200);
    //const buffer=fs.readFileSync("./index.html");
    //res.end(buffer);
    fs.readFile("./index.html",function(err,buffer){
        res.end(buffer);
    });
}
const server=http.createServer(serveIndex);//binding

server.listen(8080,"localhost",function(){
    console.log("Server is running on http://localhost:8080")
})


