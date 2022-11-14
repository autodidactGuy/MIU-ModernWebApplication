const mongoose=require("mongoose");
const bcrypt=require("bcrypt");

require("./../data/users-model");

const User=mongoose.model("User");

registerSync=function(req,res){

    const newUser={
        name,username,password
    }=req.body;

    newUser.password=bcrypt.hashSync(newUser.password,bcrypt.genSaltSync(10));

    User.create(newUser,function(err,user){
        const response={status: 201,message:user};
        if(err){
            response.status=500;
            response.message=err;
        }
        res.status(response.status).json(response.message);
    });

}

register=function(req,res){

    const newUser={
        name,username,password
    }=req.body;
    const response={status: 201,message:""};
    bcrypt.genSalt(10,function(err,salt){
        if(err){
            response.status=500;
            response.message=err;
            res.status(response.status).json(response.message);
        }else{
            bcrypt.hash(newUser.password,salt,function(err,passwordHash){
                if(err){
                    response.status=500;
                    response.message=err;
                    res.status(response.status).json(response.message);
                }
                newUser.password=passwordHash;
                User.create(newUser,function(err,user){
                    response.status=201;
                    response.message=user;
                    if(err){
                        response.status=500;
                        response.message=err;
                    }
                    res.status(response.status).json(response.message);
                });
            })
        }
    });
}

login=function(req,res){
    const {username,password}=req.body;

    User.find({username:username}).exec(function(err,user){
        const response={status: 201,message:""};
        if(err){
            response.status=500;
            response.message="Error";
             res.status(response.status).json(response.message);
        }else{
            if(!user){
                console.log("Error finding username",username);
                response.status=400;
                response.message="Incorrect username or password";
                 res.status(response.status).json(response.message);
            }else{
                brcrypt.compare(password,user.password,function(isValidPassword){
                    if(err){
                        response.status=400;
                        response.message="Incorrect username or password";
                         res.status(response.status).json(response.message);
                    }
                    else{
                        if(isValidPassword){
                            response.status=201;
                            response.message=user;
                             res.status(response.status).json(response.message);
                        }else{
                            response.status=400;
                            response.message="Incorrect username or password";
                                res.status(response.status).json(response.message);
                        }
                    }
                    
                })
            }
        }
       
    });
}

module.exports={
    insertOne: register,
    login: login
}