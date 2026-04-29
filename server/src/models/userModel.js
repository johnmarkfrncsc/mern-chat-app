import mongoose from "mongoose";

const UserModel = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePhoto: {
      type: String,
      default: "",
    },
    lastUsernameChange: {
      type: Date,
      default: null,
    },
    lastPasswordChange: {
      type: Date,
      default: null,
    },
    lastPhotoChange: {
      type: Date,
      default: null,
    },
    lastSeen: {
      type: Date,
      default: null,
    },
    bio: {
      type: String,
      default: "",
      maxlength: 190,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("User", UserModel);
