import React from 'react'
import { useState } from 'react'
const UploadResume = () => {
    const[file,setFile] = useState(null);
    const[loading,setLoading] = useState(false);
    const[upload,setUpload] = useState(false);
    const [error,setError] = useState("")
    const handleUpload=()=>{

    }

    return (
        <div>
            <h2>Step-1 Upload the Resume</h2>
            {
                upload?(
                    <p className='success'>✅ Resume Uploaded successfully</p>
                ):(
                    <>
                        <input
                        type='file'
                        accept='.pdf'
                        onChange={(e)=>setFile(e.target.files[0])}/>
                        <button onClick={handleUpload} disabled={loading}>
                            {loading?'Uploading...':'Upload Resume'}
                        </button>
                        {error && <p className='error'>{error}</p>}
                    </>
                )
            }
        </div>
    )
}

export default UploadResume