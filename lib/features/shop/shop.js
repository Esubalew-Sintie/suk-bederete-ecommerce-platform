import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const shopSlice = createApi({
  reducerPath: 'shop',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/shop/',
    prepareHeaders: (headers, { getState }) => {
      const token = localStorage.getItem('access_token'); // Adjust based on your token storage strategy
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Shop'],
  endpoints: (builder) => ({
    // get all shops
    getShops: builder.query({
      query: () => 'getshops/',
      providesTags: ['Shop'],
    }),
    // get single shop
    getShop: builder.query({
      query: (shop_id) => `getshop/${shop_id}/`,
      providesTags: ['Shop'],
    }),
    // create a new shop
    createShop: builder.mutation({
    query: ({name, templateId} ) => ({
        url: 'publishshop/',
        method: 'POST',
        body: {
          name,
          customised_template: templateId,
        },
      }),
      invalidatesTags: ['Shop'],
    }),
    // update existing shop
    updateShop: builder.mutation({
      query: ({ shopId, name, templateId, modifiedPages }) => ({
        url: `updateshop/${shopId}/`,
        method: 'PUT',
        body: {
          name,
          template: templateId,
          modified_pages: modifiedPages,
        },
      }),
      invalidatesTags: ['Shop'],
    }),
  }),
});

export const {
  useCreateShopMutation,
  useUpdateShopMutation,
  useGetShopQuery,
  useGetShopsQuery,
} = shopSlice;