import { connectToDB } from "@utils/database";
import Prompt from "@models/PromptModel";

interface PostRequest {
  userId: string;
  prompt: string;
  tag: string;
}


export const POST = 
  async (req : { json: () => Promise<PostRequest> }) => {
    const {userId, prompt, tag} = await req.json();

    try {
      await connectToDB();
      const newPrompt = new Prompt({
        creator: userId,
        prompt,
        tag
      })

      await newPrompt.save()

      return new Response(JSON.stringify(newPrompt), {
        status: 201
      })

    } catch (error) {
      return new Response('Failed to create a new prompt', {status: 500})
    }

}