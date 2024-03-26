import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// http://localhost:8000/template/getTemplate/
// Define a service using a base URL and expected endpoints
export const webBuilder = createApi({
  reducerPath: 'webBuilder',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/template/' }),
  endpoints: (builder) => ({
    getWebBuilders: builder.query({
      query: () => `getTemplate/`,
    }),
    getWebBuilder: builder.query({
      query: (templteId) => `getTemplate/${templteId}/`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetWebBuildersQuery,useGetWebBuilderQuery } = webBuilder