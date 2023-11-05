import connectDB from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request) => {
  try {
    await connectDB();

    const allPrompts = await Prompt.find({}).populate("creator");

    const prompts = JSON.stringify(allPrompts);
    return new Response(prompts, { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to read all prompts", { status: 500 });
  }
};
