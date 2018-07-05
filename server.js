const express = require("express"),
  path = require("path"),
  app = express(),
  http = require("http").Server(app),
  io = require("socket.io")(http),
  port = process.env.PORT || 5000,
  nicknames = [];

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.get("/chat", (req, res) => {
  res.send(messages);
});

/**
|--------------------------------------------------
| User opens the site
|--------------------------------------------------
*/
io.on("connection", socket => {
  io.emit("chat message", {
    timestamp: new Date(),
    sender: "Evil MAstermind",
    message: "new connection"
  });

  /**
  |--------------------------------------------------
  |  When user presses submit nickname button
  |--------------------------------------------------
  */

  socket.on("new user", data => {
    log("trying to create new user " + data);

    socket.nickname = data;
    nicknames.push(data);

    io.sockets.emit("usernames", nicknames);
    io.sockets.connected[socket.id].emit("registered", true);
    io.emit("chat message", {
      timestamp: new Date(),
      sender: "Evil MAstermind",
      message: "WelcOMe Mr. " + data
    });
  });

  /**
  |--------------------------------------------------
  | Chat message sent
  |--------------------------------------------------
  */
  socket.on("chat message", data => {
    io.emit("chat message", {
      timestamp: new Date(),
      sender: socket.nickname,
      message: data.value
    });
  });

  /**
  |--------------------------------------------------
  | User disconnects 
  |--------------------------------------------------
  */
  socket.on("disconnect", () => {
    const index = nicknames.indexOf(socket.nickname);
    nicknames.splice(index);

    log(`removed ${socket.nickname} from array, index: ${index}`);

    io.sockets.emit("usernames", nicknames);

    io.emit("chat message", {
      timestamp: new Date(),
      sender: "Evil MAstermind",
      message: `${socket.nickname} disconnected`
    });
  });
});

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "client/build")));
  // Handle React routing, return all requests to React app
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}

http.listen(port, () => console.log(`Listening on port ${port}`));

log = msg => {
  console.log(" ------ " + msg);
};
