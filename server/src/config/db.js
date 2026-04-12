import mongoose from "mongoose";

async function connectMONGODB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MONGODB successfully");
  } catch (error) {
    console.log(error, "Error in connecting to MONGODB");
  }
}

export default connectMONGODB;
