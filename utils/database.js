import mongoose from "mongoose";

let isConnected = false;
const connectDB = async () => {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_ATLAS_URI, {
      dbName: "share_prompt",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;
    console.log("Successfully Conected to DB");
  } catch (err) {
    console.log(err);
  }
};

export default connectDB;
