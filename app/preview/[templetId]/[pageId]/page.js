"use client"
import React from 'react'
import { useGetWebBuilderQuery,useGetPageQuery, useGetWebBuildersQuery } from '@/lib/features/webBuilder/webBuilder';
function previewPage({params}) {
const templateId = params.templetId;
const pageId = params.pageId;
const { data, isLoading: templateLoading } = useGetPageQuery(templateId, pageId);
console.log(data)
  return (
    <>
    <style>{data?.css}</style>
      <div dangerouslySetInnerHTML={{ __html: data?.html }} />
    </>
  )
}

export default previewPage
