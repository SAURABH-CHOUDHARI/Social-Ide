const mongoose = require("mongoose");

const conncectDB = ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/kodr")
    .then(()=>{
        console.log("Connceted to DataBase")
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports = conncectDB;