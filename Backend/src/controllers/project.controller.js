const projectModel = require('../models/project.model')

module.exports.create = async (req,res) => {
    const {name} = req.body;

    if(!name || !name?.trim()){
        return res.status(400).json({message:"name is required"})
    }
    const project = await projectModel.create({
        name
    })
    res.status(201).json({message:"project created succefully",project})
}
module.exports.list = async (req,res) => {
    const projects = await projectModel.find();
    res.status(200).json({projects})
}

module.exports.review = (req, res) => {
    if (!req.review) {
        return res.status(500).json({ error: "Failed to generate review" });
    }
    res.json({ review: req.review });
};
