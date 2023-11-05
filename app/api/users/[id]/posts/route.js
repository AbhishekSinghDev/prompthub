import connectDB from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const userid = params.id;
    const posts = await Prompt.find({ creator: userid }).populate("creator");

    return new Response(JSON.stringify(posts), { status: 201 });
  } catch (err) {
    console.log(err);
    return new Response("Failed to fetch posts.", { status: 500 });
  }
};
