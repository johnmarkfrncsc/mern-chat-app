import UserModel from "../../models/UserModel.js";

const searchUser = async (username, currentUserId) => {
  try {
    const user = await UserModel.find({
      username: { $regex: username, $options: "i" },
      _id: { $ne: currentUserId },
    }).select("username email profilePhoto");
    return user;
  } catch (error) {
    throw error;
  }
};

export default searchUser;
