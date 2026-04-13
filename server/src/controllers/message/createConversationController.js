import createConversation from "../../services/message/createConversation.js";

const createConversationController = async (req, res) => {
  try {
    console.log("req.user:", req.user);
    const senderId = req.user.id;
    const receiverId = req.params.id;
    const newConversation = await createConversation(senderId, receiverId);
    return res.status(201).json({
      data: newConversation,
      message: "New conversation established",
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: error.message,
    });
  }
};

export default createConversationController;
