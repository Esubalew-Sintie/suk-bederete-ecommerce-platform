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
    addTemplate: builder.mutation({
      query: (content) => ({
        url: `/`,
        method: "PUT",
        body:content
        
      })
    }),
    updateTemplate: builder.mutation({
      query: ({id,...content}) => ({
        url: `updateTemplate/${id}/`,
        method: "PATCH",
        body:content
        
      })
    }),
    deleteTemplate: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
        
      })
    })
	}),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetWebBuildersQuery, useGetWebBuilderQuery ,useUpdateTemplateMutation} = webBuilder;
