import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define a service using a base URL and expected endpoints
export const productsApi = createApi({
  reducerPath: 'products',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/store/' }),
  tagTypes:["product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (merchant_id) => `product/${merchant_id}/`,
      providesTags:["product"]
    }),
    createProduct: builder.mutation({
      query: (formData) => ({
        url: `product/`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["product"],
    }),
    updateProduct: builder.mutation({
      query: (products) => ({
        url: `product/`,
        method: "PATCH",
        body: {
          products: products,
        }, // Accepting an array of new products
      }),
      invalidatesTags: ["product"],
    }),
    
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProductsQuery,useUpdateProductMutation, useCreateProductMutation } = productsApi;
