import { connectToDB } from "@utils/database";
import Prompt from "@models/PromptModel";

interface PostRequest {
  userId: string;
  prompt: string;
  tag: string;
}

type ParamsType = {
  params: {
    id: string
  }
}

export const GET = async (request : PostRequest, {params}: ParamsType) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({creator: params.id}).populate('creator')

    return new Response(JSON.stringify(prompts), {status: 200})
  } catch (error) {
    return new Response('Failed to fetch your prompts', {status: 500})
  }
}