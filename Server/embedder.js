import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import {PineconeStore} from '@langchain/pinecone';
import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";
dotenv.config();
const embeddings = new GoogleGenerativeAIEmbeddings({
  apiKey: process.env.GEMINI_API_KEY,
  model: 'models/gemini-embedding-001'
})

export const storeInPinecone = async(chunks) =>{
    //connect to pinecone
    const pinecone = new Pinecone({
        apiKey:process.env.PINECONE_API_KEY
    })  
    const index = pinecone.index('jd-resume');

    //Embed Chunks and store
    const vectorStore = await PineconeStore.fromDocuments(
        chunks,
        embeddings,
        {pineconeIndex:index}
    )
    return vectorStore;

}

export const getVectorStore = async()=>{
    const pinecone = new Pinecone({
        apiKey:process.env.PINECONE_API_KEY
    })
    const index = pinecone.index('jd-resume');
    
    return await PineconeStore.fromExistingIndex(embeddings,{
        pineconeIndex:index,
    })
}
const test = async () => {
  const result = await embeddings.embedQuery('test text')
  console.log('Embedding dimension:', result.length)
  console.log('First 3 values:', result.slice(0, 3))
}
test()