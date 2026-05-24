import { useState } from 'react'
import './App.css'
import UploadResume from './components/UploadResume'
import GenerateCover from './components/GenerateCover'
import CoverLetter from './components/CoverLetter'

function App() {
  const [resumeUploaded, setResumeUploaded] = useState(false)
  const [coverLetter, setCoverLetter] = useState('')

  const step = !resumeUploaded ? 1 : !coverLetter ? 2 : 3

  return (
    <div className='app'>
      <div className='header fade-up'>
        <div className='header-tag'>AI-Powered · RAG Pipeline · LangChain</div>
        <h1>Resume <span>Tailor</span></h1>
        <p>Upload your resume once. Paste any job description. Get a tailored cover letter in seconds — powered by Gemini + Pinecone RAG.</p>
      </div>

      <div className='steps-bar fade-up'>
        <div className='step-item'>
          <div className={`step-num ${step === 1 ? 'active' : 'done'}`}>
            {step > 1 ? '✓' : '01'}
          </div>
          <span className={`step-label ${step === 1 ? 'active' : 'done'}`}>Upload Resume</span>
        </div>
        <div className='step-line' />
        <div className='step-item'>
          <div className={`step-num ${step === 2 ? 'active' : step > 2 ? 'done' : ''}`}>
            {step > 2 ? '✓' : '02'}
          </div>
          <span className={`step-label ${step === 2 ? 'active' : step > 2 ? 'done' : ''}`}>Paste JD</span>
        </div>
        <div className='step-line' />
        <div className='step-item'>
          <div className={`step-num ${step === 3 ? 'done' : ''}`}>
            {step === 3 ? '✓' : '03'}
          </div>
          <span className={`step-label ${step === 3 ? 'done' : ''}`}>Cover Letter</span>
        </div>
      </div>

      <UploadResume onUploadSuccess={() => setResumeUploaded(true)} uploaded={resumeUploaded} />

      {resumeUploaded && (
        <div className='fade-up'>
          <GenerateCover onGenerate={(letter) => setCoverLetter(letter)} />
        </div>
      )}

      {coverLetter && (
        <div className='fade-up'>
          <CoverLetter content={coverLetter} />
        </div>
      )}
    </div>
  )
}

export default App