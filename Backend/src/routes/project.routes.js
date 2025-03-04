const { Router } = require("express");
const router = Router();
const projectController = require('../controllers/project.controller')


router.post("/create",projectController.create)
router.get("/list",projectController.list)

module.exports = router;

