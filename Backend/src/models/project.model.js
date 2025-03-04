const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, "Project name is required"]
    },
    code:{
        type: String,
        required : [false, "Project code is required"],
        default: ""
    }
})

const projectModel = mongoose.model("project",projectSchema)
module.exports = projectModel;