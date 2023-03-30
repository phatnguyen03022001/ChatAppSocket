const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index.ejs');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });

  socket.on('chat message', (msg) => {
    io.emit('chat message', { username: socket.username, message: msg });
  });

  socket.on('user joined', (username) => {
    socket.username = username;
    io.emit('user joined', username);
    io.emit('user list', getUsers());
  });

  socket.on('user left', (username) => {
    io.emit('user left', username);
    io.emit('user list', getUsers());
  });

  function getUsers() {
    const users = [];
    if (io.sockets.connected) {
      Object.keys(io.sockets.connected).forEach((socketId) => {
        const user = io.sockets.connected[socketId].username;
        if (user) {
          users.push(user);
        }
      });
    }
    return users;
  }
});

http.listen(3000, () => {
  console.log('Server is running on port 3000');
});