import sendMessage from "../services/message/sendMessage.js";

const chatSocket = (io) => {
  const onlineUsers = new Map();

  io.on("connection", (socket) => {
    const { userId, username } = socket.handshake.auth;
    onlineUsers.set(socket.id, userId);
    io.emit("onlineUsers", Array.from(onlineUsers.values()));

    socket.userId = userId;
    socket.username = username;

    console.log(`USER: ${username}, CONNECTED:(${socket.id})`);

    socket.on("joinRoom", (conversationId) => {
      socket.join(conversationId);

      const roomSockets = io.sockets.adapter.rooms.get(conversationId);

      const usersInRoom = [];

      if (roomSockets) {
        for (const socketId of roomSockets) {
          const s = io.sockets.sockets.get(socketId);

          if (s) {
            usersInRoom.push({
              userId: s.userId,
              username: s.username,
              socketId: s.id,
            });
          }
        }
      }

      console.log(`Users in room ${conversationId}:`, usersInRoom);
    });

    socket.on("sendMessage", async ({ conversationId, senderId, text }) => {
      const savedMessage = await sendMessage(conversationId, senderId, text);
      io.to(conversationId).emit("newMessage", savedMessage);
    });

    socket.on("disconnect", () => {
      console.log(`USER: ${username}, DISCONNECTED:(${socket.id})`);
      onlineUsers.delete(socket.id);
      io.emit("onlineUsers", Array.from(onlineUsers.values()));
    });
  });
};

export default chatSocket;
