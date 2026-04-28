import UserModel from "../../models/UserModel.js";
import cloudinary from "../../config/cloudinary.js";

const Ten_Seconds = 10 * 1000;

const uploadPhoto = async (userId, fileBuffer) => {
  const user = await UserModel.findById(userId);
  if (!user) throw Error("User not found");

  if (
    user.lastPhotoChange &&
    Date.now() - user.lastPhotoChange.getTime() < Ten_Seconds
  ) {
    throw Error("You can only change profile photo once every ten seconds");
  }

  //convert to base64, wrap in dataUri, upload to cloudinary
  const base64 = fileBuffer.toString("base64");
  const dataUri = `data:image/jpeg;base64,${base64}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: "mern_chatApp/profile",
    transformation: [
      { width: 200, height: 200, crop: "fill" },
      { quality: "auto" },
      { fetch_format: "auto" },
    ],
  });

  const updateProfile = await UserModel.findByIdAndUpdate(
    userId,
    {
      profilePhoto: result.secure_url,
      lastPhotoChange: Date.now(),
    },
    { returnDocument: "after" },
  );

  return updateProfile;
};

export default uploadPhoto;
