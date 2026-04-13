import sendMessage from "../services/message/sendMessage.js";

const chatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log(`a user connected ${socket.id}`);
    socket.on("joinRoom", (conversationId) => {
      socket.join(conversationId);
      console.log(`a user joined room : ${conversationId}`);
    });

    socket.on("sendMessage", async ({ conversationId, senderId, text }) => {
      const savedMessage = await sendMessage(conversationId, senderId, text);
      io.to(conversationId).emit("newMessage", savedMessage);
    });

    socket.on("disconnect", () => {
      console.log(`user disconnected: ${socket.id}`);
    });
  });
};

export default chatSocket;
