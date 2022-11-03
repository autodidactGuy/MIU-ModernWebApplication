let fibonacci=require("./fibonacci");

console.log("Start ");

setTimeout(function(){
    console.log("Fibonacci of 33: "+fibonacci(33));
},0);

setTimeout(function(){
    console.log("Fibonacci of -33: "+fibonacci(-33));
},0);

console.log("End ");