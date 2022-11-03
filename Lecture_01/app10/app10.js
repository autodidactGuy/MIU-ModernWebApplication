const http=require("http");

const helloWorld=function(req,res){
    console.log("hello");
    res.setHeader("Content-Type","text/html");
    res.writeHead(200);
    res.end("<html><head><title>Hello World!</title></head><body>Hello World!</body></html>");
}
const server=http.createServer(helloWorld);//binding

//const server=http.createServer();

server.listen(8080,"localhost",function(){
    console.log("Server is running on http://localhost:8080")
})


