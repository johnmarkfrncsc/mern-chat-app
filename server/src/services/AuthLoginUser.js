import { comparePassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/JwtToken.js";
import UserModel from "../models/UserModel.js";

const loginUser = async (email, password) => {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) {
      throw Error("Invalid credentials");
    }
    const passwordCredential = await comparePassword(password, user.password);
    if (!passwordCredential) {
      throw Error("Invalid credentials");
    }

    const token = generateToken(user._id);
    return { token, user };
  } catch (error) {
    throw error;
  }
};

export default loginUser;
