"use client"
import React from 'react'
import { useGetWebBuilderQuery, useGetWebBuildersQuery } from '@/lib/features/webBuilder/webBuilder';
function previewPage({params}) {
const templateId = params.templetId;
const { data, isLoading: templateLoading } = useGetWebBuilderQuery(templateId);
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: data?.html }} />
    </>
  )
}

export default previewPage
