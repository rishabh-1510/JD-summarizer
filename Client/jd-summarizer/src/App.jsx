import { useState } from 'react'
import './App.css'
import UploadResume from './components/UploadResume'

function App() {
  const [resumeUploaded, setResumeUploaded] = useState(false)
  const [coverLetter, setCoverLetter] = useState('')
  return (
    <div className='app'>
      <h1>AI Resume Tailor</h1>
      <p className='subtitle'>Upload your resume + paste a JD → get a tailored cover letter</p>
      <UploadResume onUploadSuccess={() => setResumeUploaded(true)}/>
    
    </div>
  )
}

export default App
