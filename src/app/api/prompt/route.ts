import { connectToDB } from "@utils/database";
import Prompt from "@models/PromptModel";

export const dynamic = 'force-dynamic'

export const GET = async (request: Request) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate('creator')

    return new Response(JSON.stringify(prompts), {
      status: 200});
  } catch (error) {
    console.error('Erro ao buscar prompts:', error);
    return new Response('Falha ao buscar prompts', { status: 500 });
  }
}
