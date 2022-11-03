child_process=require("child_process");
console.log("1- Start");
const newProcess=child_process.spawn("node",["fibonacci.js"],{stdio: "inherit"});

//require("./fibonacci");

console.log("3- End");