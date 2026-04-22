import uploadPhoto from "../../services/user/UploadPhotoService.js";

const uploadPhotoController = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }
    const existingFile = req.file;
    if (!existingFile) {
      return res.status(400).json({
        message: "No file uploaded",
      });
    }

    const filebuffer = req.file.buffer;

    await uploadPhoto(userId, filebuffer);

    return res.status(200).json({
      data: userId,
      message: "Successfully uploaded profile photo",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Something went wrong",
    });
  }
};

export default uploadPhotoController;
