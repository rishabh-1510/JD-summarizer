import React, { useState } from 'react'


const GenerateCover = ({ onGenerate }) => {
    const [jd, setJd] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const handleGenerate = async () => {
        if (!jd.trim()) return setError('please Paste A JD');
        setLoading(true);
        setError('');
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/generate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ jd }),
            })

            const data = res.json()
            if (res.ok) {
                onGenerate(data.coverLetter);
            } else {
                setError(data.error || 'Generation failed')
            }
        } catch (error) {
            console.log(error);
            setError('Server not reachable');
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className='card'>
            <h2>Step 2 — Paste Job Description</h2>
            <textarea
                rows={8}
                placeholder='Paste the full job description here...'
                value={jd}
                onChange={(e) => setJd(e.target.value)}
            />
            <button onClick={handleGenerate} disabled={loading}>
                {loading ? 'Generating...' : 'Generate Cover Letter'}
            </button>
            {error && <p className='error'>{error}</p>}
        </div>
    )
}

export default GenerateCover