import UserModel from "../../models/UserModel.js";
import cloudinary from "../../config/cloudinary.js";

const Five_Days = 5 * 24 * 60 * 60 * 1000;

const uploadPhoto = async (userId, fileBuffer) => {
  const user = await UserModel.findById(userId);
  if (!user) throw Error("User not found");

  if (
    user.lastPhotoChange &&
    Date.now() - user.lastPhotoChange.getTime() < Five_Days
  ) {
    throw Error("You can only change profile photo once every five days");
  }

  //convert to base64, wrap in dataUri, upload to cloudinary
  const base64 = fileBuffer.toString("base64");
  const dataUri = `data:image/jpeg;base64,${base64}`;
  const result = await cloudinary.uploader.upload(dataUri, {
    folder: "mern_chatApp/profile",
  });

  const updateProfile = await UserModel.findByIdAndUpdate(
    userId,
    {
      profilePhoto: result.secure_url,
      lastPhotoChange: Date.now(),
    },
    { new: true },
  );

  return updateProfile;
};

export default uploadPhoto;
