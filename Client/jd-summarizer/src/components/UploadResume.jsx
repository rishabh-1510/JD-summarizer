import { useState } from 'react'

const UploadResume = ({ onUploadSuccess, uploaded }) => {
  const [file, setFile] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleUpload = async () => {
    if (!file) return setError('Please select a PDF file first')
    setLoading(true)
    setError('')
    const formData = new FormData()
    formData.append('resume', file)
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/upload-resume`, {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (res.ok) {
        onUploadSuccess()
      } else {
        setError(data.error || 'Upload failed')
      }
    } catch {
      setError('Cannot reach server — is it running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='card fade-up'>
      <div className='card-label'>Step 01</div>
      <h2>Upload Your Resume</h2>

      {uploaded ? (
        <div className='success-state'>
          <div className='check'>✓</div>
          <div>
            <p>Resume embedded successfully</p>
            <span>Vectors stored in Pinecone · Ready for matching</span>
          </div>
        </div>
      ) : (
        <>
          {loading && (
            <div className='loading-bar'>
              <div className='loading-bar-inner' />
            </div>
          )}

          <div className='upload-zone'>
            <input
              type='file'
              accept='.pdf'
              onChange={(e) => {
                setFile(e.target.files[0])
                setError('')
              }}
            />
            <span className='upload-icon'>⬆</span>
            <p>{file ? file.name : 'Drop your resume PDF here'}</p>
            <span>{file ? `${(file.size / 1024).toFixed(1)} KB` : 'or click to browse'}</span>
          </div>

          <button
            className='btn btn-primary btn-full'
            onClick={handleUpload}
            disabled={loading || !file}
          >
            {loading ? '⟳ Embedding resume...' : '→ Upload & Embed Resume'}
          </button>

          {error && <p className='error-msg'>⚠ {error}</p>}
        </>
      )}
    </div>
  )
}

export default UploadResume