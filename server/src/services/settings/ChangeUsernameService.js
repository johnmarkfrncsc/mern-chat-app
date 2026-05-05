import UserModel from "../../models/UserModel.js";

const One_Day = 24 * 60 * 60 * 1000; // equivalent to 1 day

const changeUsername = async (userId, newUsername) => {
  const user = await UserModel.findById(userId);
  if (!user) throw Error("User not found");

  //If the user changed their username less than 24 hours ago
  if (
    user.lastUsernameChange &&
    Date.now() - user.lastUsernameChange.getTime() < One_Day
  ) {
    throw new Error("You can only change username once per day");
  }

  const usernameTaken = await UserModel.exists({ username: newUsername });
  if (usernameTaken) throw new Error("Username already taken");

  const updateUsername = await UserModel.findByIdAndUpdate(
    userId,
    {
      username: newUsername,
      lastUsernameChange: Date.now(),
    },
    {
      new: true,
    },
  );

  return updateUsername;
};

export default changeUsername;
