const MongoClient= require("mongodb").MongoClient;

let _connection=null;

const open=function(){
    if(get()==null){
        MongoClient.connect(process.env.DB_URI,function(err,client){
            if(err){
                console.error("DB Connection Failed",err);
                return;
            }else{
                _connection=client.db(process.env.DB_NAME);
                console.log("DB Connection open",_connection);
            }
        });
    }
}

const get=function(){
    return _connection;
}

module.exports={
    open,
    get
};