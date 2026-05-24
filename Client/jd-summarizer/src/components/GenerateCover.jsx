import { useState } from 'react'

const GenerateCover = ({ onGenerate }) => {
  const [jd, setJd] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!jd.trim()) return setError('Please paste a job description first')
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jd }),
      })
      const data = await res.json()
      if (res.ok) {
        onGenerate(data.coverLetter)
      } else {
        setError(data.error || 'Generation failed')
      }
    } catch {
      setError('Cannot reach server — is it running?')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='card'>
      <div className='card-label'>Step 02</div>
      <h2>Paste Job Description</h2>

      {loading && (
        <div className='loading-bar'>
          <div className='loading-bar-inner' />
        </div>
      )}

      <textarea
        rows={9}
        placeholder='Paste the full job description here — the more detail, the better the match...'
        value={jd}
        onChange={(e) => {
          setJd(e.target.value)
          setError('')
        }}
      />

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.72rem', color: 'var(--text3)' }}>
          {jd.length > 0 ? `${jd.length} chars · ${jd.trim().split(/\s+/).length} words` : 'No content yet'}
        </span>
        <button
          className='btn btn-primary'
          onClick={handleGenerate}
          disabled={loading || !jd.trim()}
        >
          {loading ? '⟳ Generating...' : '→ Generate Cover Letter'}
        </button>
      </div>

      {error && <p className='error-msg'>⚠ {error}</p>}
    </div>
  )
}

export default GenerateCover