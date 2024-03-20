import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const  products= createApi({
  reducerPath: 'products',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/site-builder' }),
  endpoints: (builder) => ({
    getproducts: builder.query({
      query: (name) => `products/${name}`,
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetproductsQuery } = products