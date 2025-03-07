const config = require('../config/config')
const mongoose = require("mongoose");

const conncectDB = ()=>{
    mongoose.connect(config.MONGO_URL)
    .then(()=>{
        console.log("Connceted to DataBase")
    })
    .catch((err)=>{
        console.log(err)
    })
}

module.exports = conncectDB;