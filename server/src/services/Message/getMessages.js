import MessageModel from "../../models/MessageModel.js";

const getMessages = async (conversationId) => {
  try {
    const getAllMessage = await MessageModel.find({ conversationId })
      .populate("sender", "username")
      .sort({ createdAt: 1 });
    return getAllMessage;
  } catch (error) {
    throw error;
  }
};

export default getMessages;
