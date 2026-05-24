import PDFParser from 'pdf2json'
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters'
import { Document } from '@langchain/core/documents'

export const loadAndSplitResume = async (filePath) => {
  const text = await new Promise((resolve, reject) => {
    const parser = new PDFParser()
    parser.on('pdfParser_dataReady', (data) => {
      const text = data.Pages
        .flatMap(page => page.Texts)
        .map(t => {
          try {
            return decodeURIComponent(t.R[0].T)
          } catch {
            return t.R[0].T  // return raw text if decoding fails
          }
        })
        .join(' ')
      resolve(text)
    })
    parser.on('pdfParser_dataError', reject)
    parser.loadPDF(filePath)
  })

  console.log('Extracted text length:', text.length)

  const docs = [new Document({ pageContent: text })]

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  })

  const chunks = await splitter.splitDocuments(docs)
  console.log(`Split into ${chunks.length} chunks`)
  return chunks
}