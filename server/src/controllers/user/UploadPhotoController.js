import uploadPhoto from "../../services/user/UploadPhotoService.js";
import { getIO, userSocketMap } from "../../config/socket.js";

const uploadPhotoController = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const existingFile = req.file;
    if (!existingFile) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const updatedUser = await uploadPhoto(userId, req.file.buffer);

    const io = getIO();
    io.emit("userUpdated", {
      _id: updatedUser._id,
      profilePhoto: updatedUser.profilePhoto,
      username: updatedUser.username,
    });

    return res.status(200).json({
      data: updatedUser,
      message: "Successfully uploaded profile photo",
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
};

export default uploadPhotoController;
