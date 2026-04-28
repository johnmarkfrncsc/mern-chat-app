import { getIO, userSocketMap } from "../../config/socket.js";
import createConversation from "../../services/message/createConversation.js";

const createConversationController = async (req, res) => {
  try {
    const senderId = req.user.id;
    const receiverId = req.params.id;

    const io = getIO();

    const newConversation = await createConversation(senderId, receiverId);

    const receiverSocketId = userSocketMap[receiverId];

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newConversation", newConversation);
    }

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
