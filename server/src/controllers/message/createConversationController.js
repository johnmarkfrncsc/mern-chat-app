import createConversation from "../../services/message/createConversation.js";

const createConversationController = async (req, res) => {
  try {
    const senderId = req.user.id;
    const receiverId = req.params.id;
    const newConversation = await createConversation(senderId, receiverId);
    return res.status(201).json({
      data: newConversation,
      message: "Conversation created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: "Failed to create conversation",
    });
  }
};

export default createConversationController;
