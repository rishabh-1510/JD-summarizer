import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from '@langchain/core/prompts'
import { StringOutputParser } from '@langchain/core/output_parsers';
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { getVectorStore } from "./embedder.js";
import dotenv from "dotenv";
dotenv.config();
const model = new ChatGoogleGenerativeAI({
    model: 'gemini-2.5-flash',
    apiKey: process.env.GEMINI_API_KEY,
    maxRetries: 0,
})

const prompt = PromptTemplate.fromTemplate(`
You are an expert career coach. Using the candidate's resume context below,
write a tailored cover letter for the job description provided.

Important instructions:
- Use the candidate's actual name and details from the resume context
- Do NOT use placeholder text like [Your Name] or [Date]
- Write today's date as: ${new Date().toLocaleDateString()}
- Keep it to 3 paragraphs
- Match specific skills from resume to the JD requirements
- Tone: professional but confident

Resume Context:
{context}

Job Description:
{jd}
`)

const parser = new StringOutputParser();

export const generatedCoverLetter = async (jd) => {
    //Get vector store
    const vectorStore = await getVectorStore();

    //Create retriever : find top 4 most relevant chunks 
    const retriever = vectorStore.asRetriever(4);

    //Build rag chain
    const chain = RunnableSequence.from([
        {
            context: retriever, //retreives relevant resume chunk
            jd: new RunnablePassthrough(),

        },
        prompt,
        model,
        parser,
    ])

    //Run it
    const result = await chain.invoke(jd);
    return result;

}
