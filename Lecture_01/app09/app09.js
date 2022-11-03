const http=require("http");

const helloWorld=function(req,res){
    console.log("hello");
    res.writeHead(200);
    res.end("Hello World!");
}
const server=http.createServer(helloWorld);//binding

//const server=http.createServer();

server.listen(8080,"localhost",function(){
    console.log("Server is running on http://localhost:8080")
})


