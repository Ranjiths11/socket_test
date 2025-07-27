const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

// Initialize Socket.IO with CORS options
// const io = new Server(server, {
//     cors: {
//         origin: "https://awhere-93a4f.web.app", // Allow requests from your Next.js app
//         methods: ["GET", "POST"],
//     },
// });

const io = new Server(server, {cors: {origin:"*"}});

// app.use(cors());
app.use(express.json());

let userLocations = {};

io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('updateLocation', ({ userId, latitude, longitude, speed, heading ,altitude,name,group,created_At,updated_At}) => {
        userLocations[userId] = { latitude, longitude, speed, heading ,altitude,name,group,created_At,updated_At};
        // console.log(userLocations);
        io.emit('locationUpdate', userLocations); // Broadcast to all connected clients
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});

const PORT = 9000;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


