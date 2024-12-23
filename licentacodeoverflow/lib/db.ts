import mongoose from "mongoose";

export const dbConnect = async () => {
  if (mongoose.connections[0].readyState) {
    return;
  }
  mongoose.set("strictQuery", true);

  if (!process.env.MONGO_URL) {
    return console.log("MISSING MONGO_URL");
  }

  try {
    await mongoose.connect(process.env.MONGO_URL, {});

    console.log("MongoDB is connected");
  } catch (error) {
    console.log("MongoDB connection failed", error);
  }
};
