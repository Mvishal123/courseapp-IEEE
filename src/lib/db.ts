import mongoose from "mongoose";

export const connectDb = async () => {
  if (mongoose.connections[0].readyState) {
    console.log("Already connected.");
    return;
  }
  const db = await mongoose.connect(process.env.MONGO_URL!);
  console.log("DB Connected.");
};
