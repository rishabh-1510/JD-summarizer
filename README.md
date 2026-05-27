# AI Resume Tailor 🤖

An AI-powered cover letter generator that uses a **RAG (Retrieval-Augmented Generation)** pipeline to match your resume against any job description and generate a tailored cover letter in seconds.

Built with LangChain.js, Gemini API, Pinecone, and MERN stack.

---

## 🚀 Live Demo

> Upload your resume once → Paste any JD → Get a personalized cover letter instantly

---

## 🧠 How It Works

```
User uploads PDF Resume
        ↓
Text extracted → Split into chunks
        ↓
Chunks embedded using Gemini Embeddings
        ↓
Vectors stored in Pinecone (Vector DB)
        ↓
User pastes Job Description
        ↓
JD embedded → Pinecone finds matching resume chunks
        ↓
Gemini generates tailored cover letter
        ↓
Displayed on screen with Copy button
```

This is not a generic AI response — the system retrieves **your actual experience** most relevant to the specific job and feeds it to the LLM, producing a cover letter grounded in your real skills.

---

## ⚙️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Vite, Tailwind CSS |
| Backend | Node.js, Express.js |
| AI / LLM | Google Gemini 2.5 Flash |
| Embeddings | Gemini Embedding (`gemini-embedding-001`) |
| Vector DB | Pinecone |
| RAG Framework | LangChain.js |
| PDF Parsing | pdf2json |
| File Uploads | Multer |
| Containerization | Docker, docker-compose |
| CI/CD | GitHub Actions |

---

## 📁 Project Structure

```
JD-Summarizer2/
├── client/                      # React frontend
│   └── jd-summarizer/
│       ├── src/
│       │   ├── components/
│       │   │   ├── UploadResume.jsx
│       │   │   ├── GenerateCover.jsx
│       │   │   └── CoverLetter.jsx
│       │   ├── App.jsx
│       │   └── App.css
│       └── Dockerfile
├── server/                      # Express backend
│   ├── index.js                 # API routes
│   ├── loader.js                # PDF extraction + chunking
│   ├── embedder.js              # Pinecone vector store
│   ├── chain.js                 # LangChain RAG pipeline
│   └── Dockerfile
├── .github/
│   └── workflows/
│       └── deploy.yml           # GitHub Actions CI/CD
└── docker-compose.yml
```

---

## 🛠️ Getting Started

### Prerequisites
- Node.js v20+
- Docker Desktop
- Google AI Studio API key (free) — [aistudio.google.com](https://aistudio.google.com)
- Pinecone API key (free) — [pinecone.io](https://pinecone.io)

### 1. Clone the repo
```bash
git clone https://github.com/your-username/JD-Summarizer2.git
cd JD-Summarizer2
```

### 2. Setup environment variables

Create `server/.env`:
```env
GEMINI_API_KEY=your_gemini_api_key
PINECONE_API_KEY=your_pinecone_api_key
PINECONE_INDEX=jd-resume
```

Create `client/jd-summarizer/.env`:
```env
VITE_API_URL=http://localhost:3000
```

### 3. Setup Pinecone Index
- Go to [pinecone.io](https://pinecone.io) → Create index
- Name: `jd-resume`
- Dimensions: `3072`
- Metric: `cosine`

### 4. Run with Docker (recommended)
```bash
docker-compose up --build
```

Frontend → [http://localhost:80](http://localhost:80)  
Backend → [http://localhost:3000](http://localhost:3000)

### 5. Run without Docker

**Backend:**
```bash
cd server
npm install --legacy-peer-deps
node index.js
```

**Frontend:**
```bash
cd client/jd-summarizer
npm install
npm run dev
```

---

## 📡 API Endpoints

### `POST /upload-resume`
Upload and embed a resume PDF into Pinecone.

**Request:** `multipart/form-data`
| Field | Type | Description |
|---|---|---|
| resume | File | PDF resume file |

**Response:**
```json
{ "message": "Resume uploaded and stored successfully" }
```

---

### `POST /generate`
Generate a tailored cover letter using RAG.

**Request:** `application/json`
```json
{ "jd": "We are looking for a Full Stack Developer..." }
```

**Response:**
```json
{ "coverLetter": "Dear Hiring Team, I am writing to express..." }
```

---

## 🔑 Key Concepts

**RAG (Retrieval-Augmented Generation)**
Instead of sending your entire resume to the LLM, the system finds the most semantically relevant chunks of your resume for the specific job and only sends those. This produces more accurate, targeted output.

**Vector Embeddings**
Text is converted into high-dimensional vectors (numbers) that represent semantic meaning. Similar text produces similar vectors — allowing Pinecone to find resume sections most relevant to a given JD.

**LangChain.js**
Orchestrates the full pipeline — document loading, text splitting, embedding, retrieval, and LLM chaining — in a clean, modular way.

---

## 🐳 Docker

Build individual images:
```bash
# Backend
cd server
docker build -t resume-tailor-server .

# Frontend
cd client/jd-summarizer
docker build -t resume-tailor-client .
```

Run everything:
```bash
docker-compose up --build
```

---

## ⚡ CI/CD

GitHub Actions automatically runs on every push to `main`:
- Installs server dependencies
- Installs client dependencies  
- Builds the React frontend
- Reports build status

See `.github/workflows/deploy.yml` for the pipeline config.

---

## 🙋 Author

**Rishabh Bellwal**  
B.Tech CSE — HMR Institute of Technology & Management, Delhi  
National Finalist — Smart India Hackathon 2025  

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://www.linkedin.com/in/rishabh-belwal-66641628b)
[![GitHub](https://img.shields.io/badge/GitHub-Follow-black)](https://github.com/Rishabh-1510)
[![Portfolio](https://img.shields.io/badge/Portfolio-Visit-green)](https://portfolio-lime-ten-98.vercel.app/)

---

## 📄 License

MIT License — feel free to use and modify.
