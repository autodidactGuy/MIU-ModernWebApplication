const fs=require("fs");

console.log("1: Get a file");

writeFirstLineOfLine=function(err,buffer){
    console.log("2: Got the file",buffer.toString().substring(0,21));
};

fs.readFile("./largeText.txt",writeFirstLineOfLine);

console.log("3: App Continuess...");

