const { Router } = require("express");
const router = Router();
const projectController = require('../controllers/project.controller')
const review = require("../services/geminiAi")


router.post("/create",projectController.create)
router.get("/list",projectController.list)
router.post("/review", review  ,projectController.review)

module.exports = router;

