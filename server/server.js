const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: '*',
    }
});

io.on('connection', (socket) => {
    let username = socket.handshake.query.username
    console.log(`${username} joined`)

    socket.on('chat message', (msg) => {
        // let newMessageObj = JSON.stringify(messageObj)
        io.emit('chat message', msg);
    });

    socket.on('disconnect', () => {
        console.log(`${username} left`)
    });
});

app.get('/', (req, res) => {
    res.send('Express server');
});

server.listen(8000, () => {
    console.log('server listening on 8000');
});
