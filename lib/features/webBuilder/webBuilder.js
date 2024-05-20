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
    getCustomizedTemplate: builder.query({
      query: (merchantId) => `shop/getcustomized_template/${merchantId}/`,
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
      query: ({originalTemplateId, modifiedMerhant, modifiedPages }) => ({
        url: `shop/customized_template/`,
        method: "POST",
        body: {
          original_template: originalTemplateId,
          modifiedby: modifiedMerhant,
          modified_pages: modifiedPages,
        },
      }),
    }),
    getCustomisedPages: builder.query({
      query: ({ merchantId}) => `shop/getcustomised_pages/${merchantId}/`,
      providesTags: ["WebBuilders"],
     }),
    getCustomisedPage: builder.query({
      query: ({ templateId, pageName }) => `shop/getcustomised_page/${templateId}/${pageName}/`,
      providesTags: ["WebBuilders"],
     }),
    updatecustomizedTemplate: builder.mutation({
      query: ({CustomtemplateId,...modifiedPages}) => ({
        url: `shop/updatecustomized_template/${CustomtemplateId}/`,
        method: "PATCH",
        body:{
          modified_pages: modifiedPages
        }
        
      }),
      invalidatesTags:["WebBuilders"],

    }),
    
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetWebBuildersQuery,useUpdatePageContentMutation, useGetCustomisedPagesQuery ,useGetCustomisedPageQuery ,useUpdatecustomizedTemplateMutation,useGetCustomizedTemplateQuery ,useCustomisedTemplateMutation, useGetWebBuilderQuery, useGetPageContentQuery, useGetPageQuery, useUpdateTemplateMutation,useAddTemplateMutation,useDeleteTemplateMutation,useGetTemplatePagesQuery} = webBuilder;
