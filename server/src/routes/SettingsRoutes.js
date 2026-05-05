import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import upload from "../middleware/multer.js";
import changeUsernameController from "../controllers/settings/ChangeUsernameController.js";
import changePasswordController from "../controllers/settings/ChangePasswordController.js";
import uploadPhotoController from "../controllers/settings/UploadPhotoController.js";
import changeBioController from "../controllers/settings/ChangeBioController.js";
import changeThemeController from "../controllers/settings/ChangeThemeController.js";

const router = express.Router();

router.put("/username", protectRoute, changeUsernameController);
router.put("/password", protectRoute, changePasswordController);
router.put(
  "/profile",
  protectRoute,
  upload.single("photo"),
  uploadPhotoController,
);
router.put("/bio", protectRoute, changeBioController);
router.put("/theme", protectRoute, changeThemeController);

export default router;
