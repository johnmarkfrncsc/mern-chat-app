import { Server } from "socket.io";

let io;

export const userSocketMap = {};

const createSocketServer = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("addUser", (userId) => {
      userSocketMap[userId] = socket.id;

      io.emit("onlineUsers", Object.keys(userSocketMap));
    });

    socket.on("disconnect", () => {
      for (const [userId, socketId] of Object.entries(userSocketMap)) {
        if (socketId === socket.id) {
          delete userSocketMap[userId];
          break;
        }
      }

      io.emit("onlineUsers", Object.keys(userSocketMap));
    });
  });

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket not initialized");
  }
  return io;
};

export { createSocketServer, getIO };
