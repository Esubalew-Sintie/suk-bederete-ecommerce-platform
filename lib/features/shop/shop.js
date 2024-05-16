import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
export const shopSlice = createApi({
	reducerPath: "shop",
	baseQuery: fetchBaseQuery({baseUrl: "http://127.0.0.1:8000/shop/"}),
    tagTypes: ["Shop"],
    // get All shops
  endpoints: (builder) => ({
      // get all shops
        getShops: builder.query({
			query: () => `getshops/`,
			providesTags: ["Shop"],
        }),
        // get single shop
        getShop: builder.query({
            query: (shop_id) => `getshop/${shop_id}/`,
            providesTags: ["Shop"],
      
        }),
        // create a new shop
    createShop: builder.mutation({
        query: ({ name, templateId, modifiedPages }) => ({
          url: `create_shop/`,
          method: "POST",
          body: {
            name,
            template: templateId,
            modified_pages: modifiedPages,
          },
        }),
        invalidatesTags:["Shop"],

    }),
    // update existing shop
      updateShop: builder.mutation({
        query: ({ shopId, name, templateId, modifiedPages }) => ({
          url: `updateshop/${shopId}/`,
          method: "PUT",
          body: {
            name,
            template: templateId,
            modified_pages: modifiedPages,
          },
          }),
          invalidatesTags:["Shop"],

      }),
   
	}),
});


export const {useCreateShopMutation,useUpdateShopMutation ,useGetShopQuery,useGetShopsQuery}=shopSlice