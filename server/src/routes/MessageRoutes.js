import express from "express";
import createConversationController from "../controllers/message/createConversationController.js";
import sendMessageController from "../controllers/message/sendMessageController.js";
import getUserConversationsController from "../controllers/message/getUserConversationsController.js";
import getMessageController from "../controllers/message/getMessagesController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/:id/conversation", protectRoute, createConversationController);
router.post("/:id", protectRoute, sendMessageController);
router.get("/conversations", protectRoute, getUserConversationsController);
router.get("/:id", protectRoute, getMessageController);

export default router;
