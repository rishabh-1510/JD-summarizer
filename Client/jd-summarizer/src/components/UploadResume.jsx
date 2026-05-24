import React from 'react'
import { useState } from 'react'
const UploadResume = ({onUploadSucces}) => {
    const[file,setFile] = useState(null);
    const[loading,setLoading] = useState(false);
    const[upload,setUpload] = useState(false);
    const [error,setError] = useState("")
    const handleUpload=async()=>{
        if(!file){
            return setError('Please upload resume PDF')
        }
        setLoading(true);
        setError('');
        const formData = new FormData();
        formData.append('resume',file);

        try {
            
            const res = await fetch(`${import.meta.env.VITE_API_URL}/upload-resume`,{
                method:post,
                body:formData
            })
            const data = res.json();
            if(res.ok){
                setUpload(true);
                onUploadSucces();
            }else{
                setError(data.error || 'Upload failed')
            }

        } catch (error) {
            console.log(error)
            setError('Server Not reachable')
        }finally{
            setLoading(false);
        }
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