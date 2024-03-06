const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook"

const connectToMongo = async () =>{
    // mongoose.connect(mongoURI,()=>{
    //     console.log("Connected to Mongo successfully")
    // });
    await mongoose.connect(mongoURI).then(()=>{
        console.log("Connected to Mongo successfully")
    }).catch(err=>console.log(err))

}

module.exports = connectToMongo