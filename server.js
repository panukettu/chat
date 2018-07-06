const express = require('express'),
  path = require('path'),
  app = express(),
  http = require('http').Server(app),
  io = require('socket.io')(http),
  port = process.env.PORT || 5000,
  usernames = [];

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.get('/chat', (req, res) => {
  res.send(messages);
});

/**
|--------------------------------------------------
| User opens the site
|--------------------------------------------------
*/
io.on('connection', socket => {
  io.emit('chat message', {
    timestamp: new Date(),
    sender: 'Evil MAstermind',
    message: 'new connection'
  });
  io.sockets.connected[socket.id].emit('registered', !!socket.username);
  socket.emit('usernames', usernames);

  /**
  |--------------------------------------------------
  |  When user presses submit username button
  |--------------------------------------------------
  */

  socket.on('new user', data => {
    log('trying to create new user ' + data);

    socket.username = data;
    usernames.push(data);

    socket.broadcast.emit('usernames', usernames);
    socket.emit('registered', !!socket.username);
    io.emit('chat message', {
      timestamp: new Date(),
      sender: 'Evil MAstermind',
      message: 'Say Hello TO MR. ' + data
    });
  });

  /**
  |--------------------------------------------------
  | Chat message sent
  |--------------------------------------------------
  */
  socket.on('chat message', data => {
    socket.broadcast.emit('chat message', {
      timestamp: new Date(),
      sender: socket.username,
      message: data.value
    });
  });

  /**
  |--------------------------------------------------
  | User disconnects 
  |--------------------------------------------------
  */
  socket.on('disconnect', () => {
    const index = usernames.indexOf(socket.username);
    if (index > -1) {
      usernames.splice(index, 1);
      log(`removed ${socket.username} from array, index: ${index}`);
    }

    io.emit('usernames', usernames);

    io.emit('chat message', {
      timestamp: new Date(),
      sender: 'Evil MAstermind',
      message: `${socket.username || 'man with no name'} disconnected`
    });
  });
});

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

http.listen(port, () => console.log(`Listening on port ${port}`));

log = msg => {
  console.log(' ------ ' + msg);
};
