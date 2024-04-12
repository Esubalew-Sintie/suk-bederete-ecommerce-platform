import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
// http://localhost:8000/template/getTemplate/
// Define a service using a base URL and expected endpoints
export const webBuilder = createApi({
	reducerPath: "webBuilder",
	baseQuery: fetchBaseQuery({baseUrl: "http://127.0.0.1:8000/"}),
	tagTypes: ["WebBuilders"],
  endpoints: (builder) => ({
		getWebBuilders: builder.query({
			query: () => `template/getTemplate/`,
			providesTags: ["WebBuilders"],
		}),
		getWebBuilder: builder.query({
      query: (templteId) => `template/getTemplate/${templteId}/`,
      providesTags: ["WebBuilders"],

    }),
    getPageContent: builder.query({
      query: (templteId) => `template/getTemplatePages/${templteId}/`,
      providesTags: ["WebBuilders"],

    }),
    getPage: builder.query({
      query: ({ templateId, pageId }) => `template/getPage/${templateId}/${pageId}/`,
      providesTags: ["WebBuilders"],
     }),
    	getTemplatePages: builder.query({
        query: (pageId) => `template/getTemplatePages/${pageId}/`,
        providesTags: ["WebBuilders"],

    }),
    addTemplate: builder.mutation({
      query: ({id,...content}) => ({
        url: `template/getTemplate/${id}/`,
        method: "POST",
        body:content
        
      }),
      invalidatesTags:["WebBuilders"],

    }),
    updateTemplate: builder.mutation({
      query: ({id,...content}) => ({
        url: `template/getTemplate/${id}/`,
        method: "PATCH",
        body:content
        
      }),
      invalidatesTags:["WebBuilders"],

    }),
    updatePageContent: builder.mutation({
      query: ({templateId, page_id, ...content}) => ({
        url: `template/updatePageContent/${templateId}/${page_id}/`,
        method: "PATCH",
        body:content
        
      }),
      invalidatesTags:["WebBuilders"],

    }),
    deleteTemplate: builder.mutation({
      query: (id) => ({
        url: `template/getTemplate/${id}/`,
        method: "DELETE",
        
      }),
      invalidatesTags:["WebBuilders"],

    }),
    customisedTemplate: builder.mutation({
      query: ({CustomtemplateId, modifiedPages }) => ({
        url: `shop/customized_template/`,
        method: "POST",
        body: {
          template: CustomtemplateId,
          modified_pages: modifiedPages,
        },
      }),
    }),
    createShop: builder.mutation({
      query: ({ name, templateId, modifiedPages }) => ({
        url: `shop/create_shop/`,
        method: "POST",
        body: {
          name,
          template: templateId,
          modified_pages: modifiedPages,
        },
      }),
    }),
    updateShop: builder.mutation({
      query: ({ shopId, name, templateId, modifiedPages }) => ({
        url: `shop/updateshop/${shopId}/`,
        method: "PUT",
        body: {
          name,
          template: templateId,
          modified_pages: modifiedPages,
        },
      }),
    }),
    // Login mutation
    login: builder.mutation({
      query: (credentials) => ({
        url: `auth/login/`,
        method: "POST",
        body: credentials,
      }),
    }),

    // Registration mutation
    register: builder.mutation({
      query: (merchantData) => ({
        url: `auth/register/`,
        method: "POST",
        body: merchantData,
      }),
    }),
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetWebBuildersQuery,useUpdatePageContentMutation,useCreateShopMutation, useRegisterMutation, useLoginMutation , useCustomisedTemplateMutation, useGetWebBuilderQuery, useGetPageContentQuery, useGetPageQuery, useUpdateTemplateMutation,useAddTemplateMutation,useDeleteTemplateMutation,useGetTemplatePagesQuery} = webBuilder;
