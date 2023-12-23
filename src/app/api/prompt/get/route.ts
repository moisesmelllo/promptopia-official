import { connectToDB } from "@utils/database";
import Prompt from "@models/PromptModel";



export const GET = async (request : { json: () => Promise<Request> }) => {
  try {
    await connectToDB();

    const prompst = await Prompt.find({}).populate('creator')

    return new Response(JSON.stringify(prompst), {
      status: 200
    })
  } catch (error) {
    return new Response('Failed to fetch all prompts', { status: 500})
  }
}