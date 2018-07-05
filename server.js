const express = require("express");
const path = require("path");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 5000;

const nicknames = [];

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.get("/chat", (req, res) => {
  res.send(messages);
});

io.on("connection", socket => {
  io.emit("new connection", {
    timestamp: new Date(),
    sender: "Evil MAstermind",
    content: "peon connected"
  });

  socket.on("new user", data => {
    console.log("trying to create new user");
    socket.nickname = data;
    nicknames.push(data);
    io.sockets.emit("usernames", nicknames);
  });

  socket.on("chat message", function(data) {
    io.emit("chat message", {
      timestamp: new Date(),
      sender: data.nickName,
      content: data.value
    });
  });

  socket.on("disconnect", () => {
    io.emit("chat message", {
      timestamp: new Date(),
      sender: "Evil MAstermind",
      content: "peon disconnected"
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

const messages = [
  {
    id: 1,
    username: "tester",
    content: "Moi kaikille!"
  },
  {
    id: 2,
    username: "erkki",
    content: "Ei mulla sen kummempia :D"
  },
  {
    id: 3,
    username: "cool-nick",
    content: "ez for ence"
  },
  {
    id: 4,
    username: "mies79",
    content: "what a fuck!!!"
  }
];
