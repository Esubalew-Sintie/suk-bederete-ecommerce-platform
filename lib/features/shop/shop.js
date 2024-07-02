import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


const customBaseQuery = fetchBaseQuery({
  baseUrl: 'http://127.0.0.1:8000/shop/',
  prepareHeaders: (headers, { getState, endpoint }) => {
    // List of endpoints that do not require authentication
    const noAuthEndpoints = ['getShops', 'getShop'];
    
    // Check if the current endpoint is in the list of noAuthEndpoints
    if (!noAuthEndpoints.includes(endpoint)) {
      const token = localStorage.getItem('access_token'); // Adjust based on your token storage strategy
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
    }
    return headers;
  },
});

export const shopSlice = createApi({
  reducerPath: 'shop',
  baseQuery: customBaseQuery,
  tagTypes: ['Shop', 'CustomizedTemplate', 'customisedPage', 'WebBuilders'],
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

    getCustomizedTemplate: builder.query({
      query: (merchantId) => `getcustomized_template/${merchantId}/`,
      providesTags: ['CustomizedTemplate'],
    }),

    customisedTemplate: builder.mutation({
      query: ({ originalTemplateId, modifiedMerhant, modifiedPages }) => ({
        url: 'customized_template/',
        method: 'POST',
        body: {
          original_template: originalTemplateId,
          modifiedby: modifiedMerhant,
          modified_pages: modifiedPages,
        },
      }),
      invalidatesTags: ['CustomizedTemplate'],
    }),

    getCustomisedPages: builder.query({
      query: (merchantId) => `getcustomised_pages/${merchantId}/`,
      providesTags: ['customisedPage'],
    }),

    getCustomisedPage: builder.query({
      query: ({ templateId, pageName }) =>
        `getcustomised_page/${templateId}/${pageName}/`,
      providesTags: ['customisedPage'],
    }),

    updatecustomizedTemplate: builder.mutation({
      query: ({ customised_templateId, ...modifiedPages }) => ({
        url: `updatecustomised_pages/${customised_templateId}/`,
        method: 'POST',
        body: {
          modified_pages: modifiedPages,
        },
      }),
      invalidatesTags: ['WebBuilders'],
    }),

    getshop: builder.query({
      query: (shopId) => `getshop/${shopId}/`,
      providesTags: ['WebBuilders'],
    }),
    getshopMerchant: builder.query({
      query: (merchantId) => `getshopbymerchant/${merchantId}/`,
      providesTags: ['WebBuilders'],
    }),
    // create a new shop
    createShop: builder.mutation({
      query: ({ name, templateId }) => ({
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
  useGetCustomisedPagesQuery,
  useGetCustomisedPageQuery,
  useUpdatecustomizedTemplateMutation,
  useGetCustomizedTemplateQuery,
  useCustomisedTemplateMutation,
  useGetshopQuery,
  useGetshopMerchantQuery,
} = shopSlice;
// export const selectGetCustomizedTemplateResult =
// 	webBuilder.endpoints.getCustomizedTemplate.select();
//   export const selectCustomisedTemplateResult =
// 	webBuilder.endpoints.customisedTemplate.select();
// export const selectGetCustomisedPagesResult =
// 	webBuilder.endpoints.getCustomisedPages.select();
// export const selectGetCustomisedPageResult =
// 	webBuilder.endpoints.getCustomisedPage.select();
// export const selectUpdatecustomizedTemplateResult =
// 	webBuilder.endpoints.updatecustomizedTemplate.select();