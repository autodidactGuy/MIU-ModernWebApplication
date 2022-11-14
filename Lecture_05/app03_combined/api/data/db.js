const mongoose=require("mongoose");

mongoose.connect(process.env.DB_URI);

mongoose.connection.on("connected",function(){
    console.log("Mongoose Connected");
});

mongoose.connection.on("disconnected",function(){
    console.log("Mongoose Disconnected");
});

mongoose.connection.on("error",function(err){
    console.log("Mongoose Connection Error",err);
});

//SIGTERM - closing the terminal
process.on("SIGINT",function(){
    console.log("Interrupt Received");
    mongoose.connection.close(function(){
        console.log("Mongoose Close Done");
        process.exit(0);
    });
});

process.on("SIGUSR2",function(){
    console.log("Restart Received");
    mongoose.connection.close(function(){
        console.log("Mongoose Close Done.");
        //process.exit(0);
        process.kill(process.pid,"SIGUSR2");
    });
});