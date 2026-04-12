import { hashPassword, comparePassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/JwtToken.js";
import UserModel from "../models/UserModel.js";

const registerUser = async (username, email, password) => {
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      throw Error("Email already exists");
    }
    const hashed = await hashPassword(password);
    const newUser = await UserModel.create({
      username,
      email,
      password: hashed,
    });

    return newUser;
  } catch (error) {
    throw error;
  }
};

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

export { registerUser, loginUser };
