import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const webBuilder = createApi({
  reducerPath: 'webBuilder',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/site-builder' }),
  endpoints: (builder) => ({
    getWebBuilder: builder.query({
      query: (name) => `webBuilder/${name}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetWebBuilderQuery } = webBuilder