import { connectToDB } from "@utils/database";
import Prompt from "@models/PromptModel";

export const dynamic = 'force-dynamic'

/**
 * @method GET
 * @returns new Response
 * @description Find All Prompts and return
 */


export const GET = async (request: Request) => {
  try {
    await connectToDB();

    const prompts = await Prompt.find({}).populate('creator')

    return new Response(JSON.stringify(prompts), {
      status: 200,
      headers: {
        'Cache-Control': 'no-store', // Impede o armazenamento em cache
        'Pragma': 'no-cache', // Impede o armazenamento em cache em navegadores mais antigos
      }
    });
  } catch (error) {
    console.error('Erro ao buscar prompts:', error);
    return new Response('Falha ao buscar prompts', { status: 500 });
  }
}
