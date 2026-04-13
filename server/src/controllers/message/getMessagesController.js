import getMessage from "../../services/message/getMessages.js";

const getMessageController = async (req, res) => {
  try {
    const conversationId = req.params.id;
    const newGetMessage = await getMessage(conversationId);

    return res.status(200).json({
      data: newGetMessage,
      message: "Successfully get the message",
    });
  } catch (error) {
    return res.status(500).json({
      data: null,
      message: error.message,
    });
  }
};

export default getMessageController;
