import sendMessage from "../services/message/sendMessage.js";

const chatSocket = (io) => {
  io.on("connection", (socket) => {
    const { userId, username } = socket.handshake.auth;

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
    });
  });
};

export default chatSocket;
