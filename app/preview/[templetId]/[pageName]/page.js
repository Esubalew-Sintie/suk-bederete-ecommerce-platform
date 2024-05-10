"use client"
import React,{useEffect} from 'react'
import { useGetWebBuilderQuery,useGetCustomisedPageQuery, useGetWebBuildersQuery } from '@/lib/features/webBuilder/webBuilder';
function PreviewPage({params}) {
const templateId = params.templetId;
console.log(templateId)
const pageName = params.pageName;
console.log(pageName)
const { data, isLoading: templateLoading } = useGetCustomisedPageQuery({ templateId, pageName });
useEffect(()=>{
  const handleClick = (event) =>{
    if (event.target.matches('#shop_now')){
      alert('clicked')
    }
  }
  document.addEventListener('click', handleClick)

  return ()=>{
    document.removeEventListener('click', handleClick)
  }
}, [])

  return (
    <>
    <style>{data?.css}</style>
      <div dangerouslySetInnerHTML={{ __html: data?.html }} />
    </>
  )
}

export default PreviewPage
