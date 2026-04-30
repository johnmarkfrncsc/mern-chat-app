import ConversationModel from "../../models/ConversationModel.js";
import MessageModel from "../../models/MessageModel.js";
import { getIO, userSocketMap } from "../../config/socket.js";

const sendMessage = async (conversationId, senderId, text) => {
  try {
    const newMessage = await MessageModel.create({
      conversationId,
      sender: senderId,
      text,
    });

    const updatedConversation = await ConversationModel.findByIdAndUpdate(
      conversationId,
      { $set: { lastMessage: newMessage._id } },
      { new: true },
    )
      .populate("participants", "username profilePhoto lastSeen")
      .populate("lastMessage", "text");

    const populatedMessage = await MessageModel.findById(
      newMessage._id,
    ).populate("sender", "username");

    const io = getIO();
    updatedConversation.participants.forEach((participant) => {
      const socketId = userSocketMap[participant._id.toString()];
      if (socketId) {
        io.to(socketId).emit("conversationUpdated", updatedConversation);
      }
    });

    return populatedMessage;
  } catch (error) {
    throw error;
  }
};

export default sendMessage;
