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
  io.emit("chat message", {
    timestamp: new Date(),
    sender: "Evil MAstermind",
    message: "new connection"
  });

  socket.on("new user", data => {
    log("trying to create new user");
    socket.nickname = data;
    nicknames.push(data);
    io.sockets.emit("usernames", nicknames);
    io.emit("chat message", {
      timestamp: new Date(),
      sender: "Evil MAstermind",
      message: "WelcOMe Mr. " + data
    });
  });

  socket.on("chat message", function(data) {
    io.emit("chat message", {
      timestamp: new Date(),
      sender: data.nickName,
      message: data.value
    });
  });

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

const messages = [
  {
    id: 1,
    username: "tester",
    message: "Moi kaikille!"
  },
  {
    id: 2,
    username: "erkki",
    message: "Ei mulla sen kummempia :D"
  },
  {
    id: 3,
    username: "cool-nick",
    message: "ez for ence"
  },
  {
    id: 4,
    username: "mies79",
    message: "what a fuck!!!"
  }
];

log = msg => {
  console.log(" ------ " + msg);
};
