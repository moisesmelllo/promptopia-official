import { connectToDB } from "@utils/database";
import Prompt from "@models/PromptModel";
import User from "@models/userModels";

type ParamsType = {
  params: {
    username: string;
  };
};

export const GET = async (request: Request, { params }: ParamsType) => {
  try {
    await connectToDB();

    const userName = params.username.replace(/\s/g, '').toLowerCase()

    const user = await User.findOne({ username: userName });

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
    }

    const prompts = await Prompt.find({ creator: user._id }).populate("creator");
    console.log(prompts)

    return new Response(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response('Failed to fetch your prompts', {status: 500})
  }
};
