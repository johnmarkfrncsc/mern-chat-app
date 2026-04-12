import ConversationModel from "../../models/ConversationModel.js";

const createConversation = async (senderId, receiverId) => {
  try {
    const existingConversation = await ConversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!existingConversation) {
      const newConversation = await ConversationModel.create({
        participants: [senderId, receiverId],
      });
      return newConversation;
    }
    return existingConversation;
  } catch (error) {
    throw error;
  }
};

export default createConversation;
