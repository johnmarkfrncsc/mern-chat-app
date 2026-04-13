import sendMessage from "../../services/message/sendMessage.js";

const sendMessageController = async (req, res) => {
  try {
    const conversationId = req.params.id;
    const senderId = req.user._id;
    const text = req.body.text;

    const newSendMessage = await sendMessage(conversationId, senderId, text);
    return res.status(201).json({
      data: newSendMessage,
      message: "Successfully send a message",
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: error.message,
    });
  }
};

export default sendMessageController;
