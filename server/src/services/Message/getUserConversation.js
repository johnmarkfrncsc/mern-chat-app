import ConversationModel from "../../models/ConversationModel.js";

const getUserConversation = async (userId) => {
  try {
    const conversation = await ConversationModel.find({
      participants: userId,
    })
      .populate("participants", "username email")
      .populate("lastMessage", "text");
    return conversation;
  } catch (error) {
    throw error;
  }
};

export default getUserConversation;
