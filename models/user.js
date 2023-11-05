import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: [true, "Email is already exists!."],
    required: [true, "Email is required!."],
  },
  username: {
    type: String,
    required: [true, "Username is required!."],
    match: [
      /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
      "Username invalid, it should contain 8-20 alphanumeric letters and be unique!",
    ],
  },
  image: {
    type: String,
  },
});

// Since we are usng nextjs serverless functionality
// The "models" object is provied by mongoose library and stores all the registered models.
// If a model name "User" already exists in "models" object, it assigns that existing model to the "User" variable.
// This prevent redefining the model and ensures that the existing model is reused.

// If a model name "User" does not exist in the "models" object, the "model" function from Mongoose is called to create a new model.
// The newly created model is then assigned to the "User" variable.

const User = models.User || mongoose.model("User", userSchema); // extra check to prevent recreation of model again and again
export default User;
