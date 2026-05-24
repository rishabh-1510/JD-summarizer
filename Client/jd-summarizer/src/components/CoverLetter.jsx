import { useState } from 'react'
import ReactMarkdown from 'react-markdown'

const CoverLetter = ({ content }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const wordCount = content.trim().split(/\s+/).length

  return (
    <div className='card'>
      <div className='card-label'>Step 03</div>
      <div className='cover-header'>
        <div>
          <h2 style={{ marginBottom: 6 }}>Your Cover Letter</h2>
          <div className='cover-meta'>
            <div className='cover-dot' />
            <span>AI Generated · RAG-matched · {wordCount} words</span>
          </div>
        </div>
        <button className='btn btn-secondary' onClick={handleCopy}>
          {copied ? '✓ Copied' : '⎘ Copy'}
        </button>
      </div>

      <div className='divider' />

      <div className='cover-content'>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </div>
  )
}

export default CoverLetter