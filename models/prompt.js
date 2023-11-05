import mongoose, { model, models } from "mongoose";

const promptSchema = new mongoose.Schema({
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  prompt: {
    type: String,
    required: [true, "Prompt cannot be empty"],
  },
  tag: {
    type: String,
    required: [true, "Tag cannot be empty"],
  },
});

const Prompt = models.Prompt || mongoose.model("Prompt", promptSchema);
export default Prompt;
