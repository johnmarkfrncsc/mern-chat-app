import ConversationModel from "../../models/ConversationModel.js";
import MessageModel from "../../models/MessageModel.js";

const sendMessage = async (conversationId, senderId, text) => {
  try {
    const newMessage = await MessageModel.create({
      conversationId,
      sender: senderId,
      text,
    });
    await ConversationModel.findByIdAndUpdate(conversationId, {
      $set: { lastMessage: newMessage._id },
    });

    return newMessage;
  } catch (error) {
    throw error;
  }
};

export default sendMessage;
