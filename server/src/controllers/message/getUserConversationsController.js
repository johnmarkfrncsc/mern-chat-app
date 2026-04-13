import getUserConversation from "../../services/message/getUserConversation.js";

const getUserConversationsController = async (req, res) => {
  try {
    const userId = req.user.id;
    const getUserConvo = await getUserConversation(userId);
    return res.status(200).json({
      data: getUserConvo,
      message: "Conversations fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: "Failed to fetch conversations",
    });
  }
};

export default getUserConversationsController;
