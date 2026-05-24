import React from 'react'
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
const CoverLetter = ({ content }) => {
    const [copies, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(()=>setCopied(false),2000)
    }
    return (
        <div className='card'>
            <div className='cover-header'>
                <h2>Your Cover Letter</h2>
                <button className='copy-btn' onClick={handleCopy}>
                    {copied ? '✅ Copied' : '📋 Copy'}
                </button>
            </div>
            <div className='cover-content'>
                <ReactMarkdown>{content}</ReactMarkdown>
            </div>
        </div>
    )
}

export default CoverLetter