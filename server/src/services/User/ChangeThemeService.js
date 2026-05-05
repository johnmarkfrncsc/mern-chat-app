import UserModel from "../../models/UserModel.js";

const changeTheme = async (userId, themeColor) => {
  const update = await UserModel.findByIdAndUpdate(
    userId,
    { themeColor },
    { new: true },
  );
  return update;
};

export default changeTheme;
