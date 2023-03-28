import express from "express";
import { Server } from "socket.io";
import http from "http";
import router from "./router.js";
import cors from "cors";
import users from "./users.js";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  socket.on("join", ({ name, room }, callback) => {
    const { user } = users.addUser({ id: socket.id, name, room });

    if (user === undefined) socket.emit("error", { message: "User Exsit" });
    else {
      socket.emit("message", { user: "admin", text: `${user.name}, welcome to room ${user.room}.` });
      socket.broadcast.to(user.room).emit("message", { user: "admin", text: `${user.name}, has joined!` });
      socket.join(user.room);

      io.to(user.room).emit("roomData", { room: user.room, users: users.getUsersInRoom(user.room) });

      let usersInRoom = users.getUsersInRoom(user.room);
      console.log(usersInRoom);
      socket.emit("usersInRoom", { usersInRoom });
      socket.broadcast.to(user.room).emit("usersInRoom", { usersInRoom });

      callback();
    }
  });

  socket.on("sendMessage", (userInfo, callback) => {
    io.to(userInfo.room).emit("message", {
      user: userInfo.name,
      text: userInfo.message,
      userColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
    });
    io.to(userInfo.room).emit("roomData", { room: userInfo.room, users: users.getUsersInRoom(userInfo.room) });
    callback();
  });

  socket.on("disconnect", () => {
    const user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit("message", { user: "admin", text: `${user.name} has left` });
      let usersInRoom = users.getUsersInRoom(user.room);
      socket.emit("usersInRoom", { usersInRoom });
      socket.broadcast.to(user.room).emit("usersInRoom", { usersInRoom });
    }
  });
});

app.use(router);

server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));
