const app =require("./src/app")
const conncectDB = require('./src/db/db')


conncectDB();

const server = require("http").createServer(app);
const io = require('socket.io')(server,{
    cors:{
        origin: "*",
    }
});

io.on('connection', socket => {

    const projectId = socket.handshake.query.projectId
    
    socket.join(projectId)
    socket.on('message', msg => {
        socket.broadcast.to(projectId).emit('message', msg)
    })

    console.log('User connected');
});


server.listen(3000, () => {
    console.log('Server is running on port 3000');
});