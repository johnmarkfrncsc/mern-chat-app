import ConversationModel from "../../models/ConversationModel.js";

const createConversation = async (senderId, receiverId) => {
  try {
    let conversation = await ConversationModel.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await ConversationModel.create({
        participants: [senderId, receiverId],
      });
    }

    const populated = await conversation.populate(
      "participants",
      "username email profilePhoto",
    );

    return populated;
  } catch (error) {
    throw error;
  }
};

export default createConversation;
