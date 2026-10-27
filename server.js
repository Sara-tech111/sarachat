const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const PORT = 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// serve the files in the public directory
app.use(express.static(path.join(__dirname, 'public')));

// handle connections from chat users
io.on('connection', (socket) => {
    console.log('new user connected');

    //receive a message and broadcast it to every connected user
    socket.on('message', (msg) => {
        io.emit('message', msg);
    });

    // handle a user disconnecting
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

// start the server
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});