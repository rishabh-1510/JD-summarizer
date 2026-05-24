import dotenv from 'dotenv'
dotenv.config()

const response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
)
const data = await response.json()

// filter only embedding models
const embeddingModels = data.models.filter(m => 
  m.name.includes('embed')
)

console.log('Available embedding models:')
embeddingModels.forEach(m => console.log(m.name, '-', m.supportedGenerationMethods))