import 'dotenv/config';
import OpenAI from 'openai'


const OpenAIApiKey = process.env.OPENAI_API_KEY
const baseUrl = process.env.OPENAI_BASE_URL

if (!process.env.OPENAI_MODEL) {
    throw new Error("OPENAI_MODEL environment variable is not set")
}
export const model = process.env.OPENAI_MODEL

export const client = new OpenAI({
    apiKey: OpenAIApiKey || undefined,
    baseURL: baseUrl || undefined,

})