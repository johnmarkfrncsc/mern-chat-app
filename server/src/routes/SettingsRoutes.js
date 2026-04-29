import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import upload from "../middleware/multer.js";
import changeUsernameController from "../controllers/user/ChangeUsernameController.js";
import changePasswordController from "../controllers/user/ChangePasswordController.js";
import uploadPhotoController from "../controllers/user/UploadPhotoController.js";

const router = express.Router();

router.put("/username", protectRoute, changeUsernameController);
router.put("/password", protectRoute, changePasswordController);
router.put(
  "/profile",
  protectRoute,
  upload.single("photo"),
  uploadPhotoController,
);

export default router;
