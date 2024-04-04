import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
// http://localhost:8000/template/getTemplate/
// Define a service using a base URL and expected endpoints
export const webBuilder = createApi({
	reducerPath: "webBuilder",
	baseQuery: fetchBaseQuery({baseUrl: "http://127.0.0.1:8000/template"}),
	tagTypes: ["WebBuilders"],
  endpoints: (builder) => ({
		getWebBuilders: builder.query({
			query: () => `/getTemplate/`,
			providesTags: ["WebBuilders"],
		}),
		getWebBuilder: builder.query({
			query: (templteId) => `/getTemplate/${templteId}/`,
    }),
    	getTemplatePages: builder.query({
			query: (pageId) => `/getTemplatePages/${pageId}/`,
    }),
    addTemplate: builder.mutation({
      query: ({id,...content}) => ({
        url: `/getTemplate/${id}/`,
        method: "POST",
        body:content
        
      }),
      invalidatesTags:["WebBuilders"],

    }),
    updateTemplate: builder.mutation({
      query: ({id,...content}) => ({
        url: `/getTemplate/${id}/`,
        method: "PATCH",
        body:content
        
      }),
      invalidatesTags:["WebBuilders"],

    }),
    updatePageContent: builder.mutation({
      query: ({id,...content}) => ({
        url: `/updatePageContent/${id}/`,
        method: "PATCH",
        body:content
        
      }),
      invalidatesTags:["WebBuilders"],

    }),
    deleteTemplate: builder.mutation({
      query: (id) => ({
        url: `/getTemplate/${id}/`,
        method: "DELETE",
        
      }),
      invalidatesTags:["WebBuilders"],

    })
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetWebBuildersQuery, useGetWebBuilderQuery ,useUpdateTemplateMutation,useAddTemplateMutation,useDeleteTemplateMutation} = webBuilder;
