require("dotenv").config();
const studentsData=require("../data/students.json");

module.exports.getAll=function(req,res){
    res.status(200).json(studentsData);
}

module.exports.getOne=function(req,res){
    const studentIndex=req.params.studentId-1;
    const theStudent=studentsData[studentIndex];
    if(theStudent){
        res.status(process.env.OK_STATUS_CODE).json(theStudent);
    }else{
        res.status(process.env.NOT_FOUND_STATUS_CODE).json({"message": process.env.NOT_FOUND_MESSAGE});
    }
}