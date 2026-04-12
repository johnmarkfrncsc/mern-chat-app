import { hashPassword } from "../utils/hashPassword.js";
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

export default registerUser;
