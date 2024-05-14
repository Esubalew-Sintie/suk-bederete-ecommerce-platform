"use client"
import html2canvas from "html2canvas";
import { useRouter } from 'next/navigation'; // Import useRouter from next/router

import React,{useEffect,useState} from 'react'
import { useGetWebBuilderQuery,useGetCustomisedPageQuery, useGetWebBuildersQuery } from '@/lib/features/webBuilder/webBuilder';
function PreviewPage({params}) {
const templateId = params.templetId;
console.log(templateId)
const pageName = params.pageName;
console.log(pageName)
const { data, isLoading: templateLoading } = useGetCustomisedPageQuery({ templateId, pageName });
const [hasMounted, setHasMounted] = useState(false);
const router = useRouter(); // Initialize useRouter

const [message, setMessage] = useState("");

const captureAndUploadScreenshot = async () => {
  const container = document.querySelector('#features');

  // Check if the container is not null
  if (!container) {
    console.error('Container not found');
    return;
  }
  try {
    const canvas = await html2canvas(container);
    const imgData = canvas.toDataURL('image/png');
    const binaryData = atob(imgData.split(",")[1]);
    const dataArray = new Uint8Array(binaryData.length);
    for (let i = 0; i < binaryData.length; i++) {
      dataArray[i] = binaryData.charCodeAt(i);
    }
    const blob = new Blob([dataArray], { type: "image/png" });
    const file = new File([blob], "screenshot.png", { type: "image/png" });
    const formData = new FormData();
    formData.append("image", file);
    const response = await fetch("http://localhost:8000/shop/upload/", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setMessage("Screenshot uploaded successfully");

    } else {
      setMessage("Failed to upload screenshot");
    }
  } catch (error) {
    console.error("Error capturing or uploading screenshot:", error);
    setMessage("Error capturing or uploading screenshot");
  }
  router.push('/admin/dashboard'); // Navigate to /admin/dashboard

};


// useEffect(()=>{
//   const handleClick = (event) =>{
//     if (event.target.matches('#shop_now')){
//       captureAndUploadScreenshot()
//       alert("alert")
//       console.log('asjkfhaksfhkj')
//     }
//   }
//   document.addEventListener('click', handleClick)

//   return ()=>{
//     document.removeEventListener('click', handleClick)
//   }
  // }, [])
  useEffect(() => {
    setHasMounted(true);
    setTimeout(() => {
      if (hasMounted) {
        captureAndUploadScreenshot();
      }
    }, 2000); // Adjust the delay as needed
  }, [hasMounted]);
  
  return (
    <>
    <style>{data?.css}</style>
      <div dangerouslySetInnerHTML={{ __html: data?.html }} />
    </>
  )
}

export default PreviewPage
