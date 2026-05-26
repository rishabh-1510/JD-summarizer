import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import multer from 'multer'
import { loadAndSplitResume } from './loader.js'
import { storeInPinecone } from './embedder.js'
import { generatedCoverLetter } from './chain.js'

dotenv.config();
const app = express();
app.use(cors({
    origin: ["http://localhost:5173","http://localhost:4000","https://jd-summarizer-six.vercel.app"],
    credentials: true
}));
app.use(express.json());

//Multer setup - saves uploaded PDF to /uploads folder
const upload = multer({ dest: 'uploads/' })

//Route 1 - Upload resume
app.post('/upload-resume', upload.single('resume'), async (req, res) => {
    try {
        const chunks = await loadAndSplitResume(req.file.path)
        await storeInPinecone(chunks)
        res.json({ message: 'Resume uploaded and stored successfully' })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
})
//Route 2 -Generate cover letter
app.post('/generate', async (req, res) => {
    try {
        const { jd } = req.body
        const coverLetter = await generatedCoverLetter(jd)
        res.json({ coverLetter })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: err.message })
    }
})

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server Running at ${PORT}`);
});