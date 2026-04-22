import UserModel from "../../models/UserModel.js";
import { hashPassword, comparePassword } from "../../utils/hashPassword.js";

const Five_Days = 5 * 24 * 60 * 60 * 1000;

const changePassword = async (userId, currentPasssword, newPassword) => {
  const user = await UserModel.findById(userId);
  if (!user) throw Error("User not found");

  if (
    user.lastPasswordChange &&
    Date.now() - user.lastPasswordChange.getTime() < Five_Days
  ) {
    throw Error("You can only change password once every 5 days");
  }

  const verifyPassword = await comparePassword(currentPasssword, user.password);
  if (!verifyPassword) throw Error("Current password is incorrect");

  const hashed = await hashPassword(newPassword);

  const updatePassword = await UserModel.findByIdAndUpdate(
    userId,
    {
      password: hashed,
      lastPasswordChange: Date.now(),
    },
    { new: true },
  );

  return updatePassword;
};

export default changePassword;
