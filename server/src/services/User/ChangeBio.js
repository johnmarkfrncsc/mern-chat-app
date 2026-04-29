import UserModel from "../../models/UserModel.js";

const changeBio = async (userId, newBio) => {
  const user = await UserModel.findById(userId);
  if (!user) throw new Error("User not found");

  if (newBio.length > 190)
    throw new Error("Bio must be 190 characters or less");

  const updated = await UserModel.findByIdAndUpdate(
    userId,
    { bio: newBio },
    { new: true },
  );

  return updated;
};

export default changeBio;
