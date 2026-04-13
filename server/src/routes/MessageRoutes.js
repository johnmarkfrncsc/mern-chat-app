import express from "express";
import createConversationController from "../controllers/message/createConversationController.js";
import sendMessageController from "../controllers/message/sendMessageController.js";
import getUserConversationsController from "../controllers/message/getUserConversationsController.js";
import getMessageController from "../controllers/message/getMessagesController.js";

const router = express.Router();

router.post("/:id/conversation", createConversationController);
router.post("/:id", sendMessageController);
router.get("/conversations", getUserConversationsController);
router.get("/:id", getMessageController);

export default router;
