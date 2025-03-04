const express = require('express');
const app = express();
const projectRoutes = require("./routes/project.routes")
const cors = require('cors')

app.use(cors());
app.use(express.json({
    limit: "10mb"
}));
app.use(express.urlencoded({
    extended: true,
    limit: "10mb"
}));


app.use("/v1/api/project",projectRoutes)


module.exports = app;