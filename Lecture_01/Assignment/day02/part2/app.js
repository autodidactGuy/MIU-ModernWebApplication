const fs = require("fs");
const http=require("http");

const serveIndex=function(req,res){
    console.log(req.method);
    if(req.method=="POST"){
        res.setHeader("Content-Type","application/json");
        res.writeHead(200);
        res.end('{ message: "This is json response of POST request!"}');
        return;
    }
    switch(req.url){//req.method
        case "/":
            res.setHeader("Content-Type","text/html");
            res.writeHead(200);
            fs.createReadStream('./index.html').pipe(res);
            break;
        case "/index.html":
            res.setHeader("Content-Type","text/html");
            res.writeHead(200);
            fs.createReadStream('./index.html').pipe(res);
            break;
        case "/page1.html":
            res.setHeader("Content-Type","text/html");
            res.writeHead(200);
            fs.createReadStream('./page1.html').pipe(res);
            break;
        case "/page2.html":
            res.setHeader("Content-Type","text/html");
            res.writeHead(200);
            fs.createReadStream('./page2.html').pipe(res);
            break;
        default:
            res.setHeader("Content-Type","text/html");
            res.writeHead(404);
            res.end("File Not Found!");
            break;
    }
}

const server=http.createServer(serveIndex);

server.listen(3434,"localhost",function(){
    console.log("Server is running on http://localhost:3434")
})






