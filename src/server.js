const express = require("express");
const cors = require("cors");
// const path = require("path");
const { PORT } = require("./config/server");
const http = require("http");
const socketIo = require("socket.io");
const { ee } = require("./event/event");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" },
});

app.use(cors());
app.use(express.json());
// app.use("/media", express.static(path.join(__dirname, "./uploads")));
app.use(require("./middlewares/auth").AUTH);
app.use("/", require("./routers/routers"));

io.on("connection", (socket) => {
  ee.on("CREATE_COMMENT", (comment) => {
    socket.broadcast.emit("CREATE_COMMENT", comment);
  });
  ee.on("CREATE_POST", (post) => {
    socket.broadcast.emit("CREATE_POST", post);
  });
  ee.on("CREATE_USER", (user) => {
    socket.broadcast.emit("CREATE_USER", user);
  });
});

server.listen(PORT, () =>
  console.log(`Server has been started on port: ${PORT}`)
);
