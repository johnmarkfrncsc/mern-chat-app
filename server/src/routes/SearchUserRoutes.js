import express from "express";
import searchUserController from "../controllers/user/SearchUserController.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/search", protectRoute, searchUserController);

export default router;
