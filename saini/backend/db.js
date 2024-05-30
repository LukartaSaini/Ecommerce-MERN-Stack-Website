const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/Project_Saini'

const db =async ()=>{
    console.log("Mongoodb connected");
    try{
        
        await mongoose.connect(mongoURL);
        let fetched_Category = mongoose.connection.db.collection("Label_Category");
        let data_Category=await fetched_Category.find({}).toArray();

        let fetched_Type = mongoose.connection.db.collection("Label_Tyle");
        let data_Type=await fetched_Type.find({}).toArray();
           
                global.Label_Category = data_Category ;           // global variable use to access this variable in any file in projecy
                global.Label_Tyle = data_Type ;           // global variable use to access this variable in any file in projecy
            
    }
    catch(error){
        console.log("err",error)
        console.log("connected catch");
    }
};

module.exports = db;






