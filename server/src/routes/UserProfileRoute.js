import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import getUserProfileController from "../controllers/user/GetUserProfileController.js";

const router = express.Router();

router.get("/:id", protectRoute, getUserProfileController);

export default router;
