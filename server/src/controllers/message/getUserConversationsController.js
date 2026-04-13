import getUserConversation from "../../services/message/getUserConversation.js";

const getUserConversationsController = async (req, res) => {
  try {
    const userId = req.user._id;
    const getUserConvo = await getUserConversation(userId);
    return res.status(200).json({
      data: getUserConvo,
      message: "Successfully get user conversation",
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: error.message,
    });
  }
};

export default getUserConversationsController;
