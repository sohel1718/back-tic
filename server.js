const io = require('socket.io')(8000, {
    cors: ["http://localhost:3000"]
})

io.on("connection", socket => {
    socket.on("join-room", (data, cb) => {
        socket.join(data.roomName);
        cb(data)
    })
    socket.on("send-info", data => {
        socket.to(data.roomName).emit('receive-info', data);
    })

    socket.on("send-game-info", (game, turn, roomName, winner = "") => {
        socket.to(roomName).emit('receive-game-info', game, turn, winner);
    })
})

