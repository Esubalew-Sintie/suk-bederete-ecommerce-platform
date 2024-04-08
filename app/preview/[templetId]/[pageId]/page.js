"use client"
import React,{useEffect} from 'react'
import { useGetWebBuilderQuery,useGetPageQuery, useGetWebBuildersQuery } from '@/lib/features/webBuilder/webBuilder';
function PreviewPage({params}) {
const templateId = params.templetId;

const pageId = params.pageId;

const { data, isLoading: templateLoading } = useGetPageQuery({ templateId, pageId });
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
