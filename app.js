const express = require('express');
const app = express();

const http = require('http');
const path = require('path');
const server = http.createServer(app);

const socketIo = require('socket.io');
const io = socketIo(server);

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

io.on('connection', (socket) => {

    socket.on('send-location', (data) => {
        io.emit('receive-location', {id: socket.id, ...data});
        // console.log('user disconnected');
    });
    
    console.log('connected');

    socket.on('disconnect', () => {
        io.emit('user-disconnected', socket.id);
        console.log('user disconnected');
    });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});