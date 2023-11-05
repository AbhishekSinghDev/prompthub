import connectDB from "@utils/database";
import Prompt from "@models/prompt";

// GET (read)
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const prompt = await Prompt.findById(params.id).populate("creator");

    if (!prompt) return new Response("Prompt not found!", { status: 404 });

    return new Response(JSON.stringify(prompt), { status: 200 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to read all prompts", { status: 500 });
  }
};

// PATCH
export const PATCH = async (request, { params }) => {
  const { prompt, tag } = await request.json();

  try {
    await connectDB();
    const existingPrompt = await Prompt.findById(params.id);

    if (!existingPrompt)
      return new Response("Prompt not found!", { status: 404 });

    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;

    existingPrompt.save();
    return new Response(JSON.stringify(existingPrompt), { status: 201 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to edit the post!", { status: 500 });
  }
};

// DELETE
export const DELETE = async (request, { params }) => {
  const { promptid } = params;

  try {
    await connectDB();

    await Prompt.findByIdAndDelete(params.id);
    return new Response("Deleted successfully!", { status: 200 });
  } catch (err) {
    return new Response("Failed to delete prompt!", { status: 500 });
  }
};
