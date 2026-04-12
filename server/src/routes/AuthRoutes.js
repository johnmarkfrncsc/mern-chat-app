import express from "express";
import registerController from "../controllers/RegisterController.js";
import loginController from "../controllers/LoginController.js";

const router = express.Router();

router.post("/register", registerController);
router.post("/login", loginController);

export default router;
