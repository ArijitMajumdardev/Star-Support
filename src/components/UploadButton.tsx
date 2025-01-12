import { uploadToS3 } from '@/actions/uploadActions';
import React, { ChangeEvent } from 'react'
import { FaUpload } from 'react-icons/fa'

function UploadButton({onUploadComplete}:{onUploadComplete:(usl:string)=>void}) {


    async function upload(ev:ChangeEvent<HTMLInputElement>) {
        const target = ev.target as HTMLInputElement;
        console.log(target.files)
        if (target.files?.length) {
          const file = target.files[0];
          const formData = new FormData;
          formData.set('file', file);
          try {
            const result = await uploadToS3(formData);
            onUploadComplete(result.url); // Pass the file URL to the parent
          } catch (error) {
            console.error("Upload failed:", error);
          }
        }
    }
    

  return (
    <>
    <label className="bg-white shadow-sm shadow-black/30 p-2 cursor-pointer rounded-lg flex gap-1 items-center ">
    <FaUpload />
      
      <input className="hidden" type="file" onChange={ev => upload(ev)}/>
    </label>
  </>
  )
}

export default UploadButton