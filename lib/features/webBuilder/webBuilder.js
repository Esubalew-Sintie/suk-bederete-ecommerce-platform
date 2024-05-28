import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";

export const webBuilder = createApi({
	reducerPath: "webBuilder",
	baseQuery: fetchBaseQuery({baseUrl: "http://localhost:8000/"}), // Corrected base URL
	tagTypes: [
		"WebBuilders",
		"CustomizedTemplate",
		"customisedPage",
		"Page",
		"Template",
	],
	endpoints: (builder) => ({
		getWebBuilders: builder.query({
			query: () => `template/getTemplate/`,
			providesTags: ["WebBuilders"],
		}),
		getWebBuilder: builder.query({
			query: (templateId) => `template/getTemplate/${templateId}/`, // Fixed typo
			providesTags: ["WebBuilders"],
		}),
		
		getPageContent: builder.query({
			query: (templateId) => `template/getTemplatePages/${templateId}/`,
			providesTags: ["Template"],
		}),
		getPage: builder.query({
			query: ({templateId, pageId}) =>
				`template/getPage/${templateId}/${pageId}/`,
			providesTags: ["Page"],
		}),
		getTemplatePages: builder.query({
			query: (pageId) => `template/getTemplatePages/${pageId}/`,
			providesTags: ["Page"],
		}),
		addTemplate: builder.mutation({
			query: ({id, ...content}) => ({
				url: `template/getTemplate/${id}/`,
				method: "POST",
				body: content, // Corrected structure
			}),
			invalidatesTags: ["Template"],
		}),
		updateTemplate: builder.mutation({
			query: ({id, ...content}) => ({
				url: `template/getTemplate/${id}/`,
				method: "PATCH",
				body: content, // Corrected structure
			}),
			invalidatesTags: ["Template"],
		}),
		updatePageContent: builder.mutation({
			query: ({templateId, page_id, ...content}) => ({
				url: `template/updatePageContent/${templateId}/${page_id}/`,
				method: "PATCH",
				body: content, // Corrected structure
			}),
			invalidatesTags: ["Page"],
		}),
		deleteTemplate: builder.mutation({
			query: (id) => ({
				url: `template/getTemplate/${id}/`,
				method: "DELETE",
			}),
			invalidatesTags: ["Template"],
		}),
    
	}),
});

export const {
	useGetWebBuildersQuery,
	useUpdatePageContentMutation,
	useGetWebBuilderQuery,
	useGetPageContentQuery,
	useGetPageQuery,
	useUpdateTemplateMutation,
	useAddTemplateMutation,
	useDeleteTemplateMutation,
	useGetTemplatePagesQuery,
} = webBuilder;

// Export selectors for each query endpoint
// export const selectGetWebBuildersResult =
// 	webBuilder.endpoints.getWebBuilders.select();
// export const selectGetWebBuilderResult =
// 	webBuilder.endpoints.getWebBuilder.select();
// export const selectGetPageContentResult =
// 	webBuilder.endpoints.getPageContent.select();
// export const selectGetPageResult = webBuilder.endpoints.getPage.select();
// export const selectGetTemplatePagesResult =
// 	webBuilder.endpoints.getTemplatePages.select();
// export const selectAddTemplateResult =
// 	webBuilder.endpoints.addTemplate.select();
// export const selectUpdateTemplateResult =
// 	webBuilder.endpoints.updateTemplate.select();
// export const selectUpdatePageContentResult =
// 	webBuilder.endpoints.updatePageContent.select();
// export const selectDeleteTemplateResult =
// 	webBuilder.endpoints.deleteTemplate.select();

