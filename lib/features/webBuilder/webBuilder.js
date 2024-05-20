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
		getCustomizedTemplate: builder.query({
			query: (merchantId) => `shop/getcustomized_template/${merchantId}/`,
			providesTags: ["CustomizedTemplate"],
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
		customisedTemplate: builder.mutation({
			query: ({originalTemplateId, modifiedMerhant, modifiedPages}) => ({
				url: `shop/customized_template/`,
				method: "POST",
				body: {
					original_template: originalTemplateId,
					modifiedby: modifiedMerhant,
					modified_pages: modifiedPages,
				},
			}),
			invalidatesTags: ["CustomizedTemplate"],
		}),
		getCustomisedPages: builder.query({
			query: (merchantId) => `shop/getcustomised_pages/${merchantId}/`,
			providesTags: ["customisedPage"],
		}),
		getCustomisedPage: builder.query({
			query: ({templateId, pageName}) =>
				`shop/getcustomised_page/${templateId}/${pageName}/`,
			providesTags: ["customisedPage"],
		}),
		updatecustomizedTemplate: builder.mutation({
			query: ({customTemplateId, ...modifiedPages}) => ({
				url: `shop/updatecustomized_template/${customTemplateId}/`,
				method: "PATCH",
				body: {
					modified_pages: modifiedPages,
				},
			}),
			invalidatesTags: ["CustomizedTemplate"],
		}),
	}),
});

export const {
	useGetWebBuildersQuery,
	useUpdatePageContentMutation,
	useGetCustomisedPagesQuery,
	useGetCustomisedPageQuery,
	useUpdatecustomizedTemplateMutation,
	useGetCustomizedTemplateQuery,
	useCustomisedTemplateMutation,
	useGetWebBuilderQuery,
	useGetPageContentQuery,
	useGetPageQuery,
	useUpdateTemplateMutation,
	useAddTemplateMutation,
	useDeleteTemplateMutation,
	useGetTemplatePagesQuery,
} = webBuilder;

// Export selectors for each query endpoint
export const selectGetWebBuildersResult =
	webBuilder.endpoints.getWebBuilders.select();
export const selectGetWebBuilderResult =
	webBuilder.endpoints.getWebBuilder.select();
export const selectGetCustomizedTemplateResult =
	webBuilder.endpoints.getCustomizedTemplate.select();
export const selectGetPageContentResult =
	webBuilder.endpoints.getPageContent.select();
export const selectGetPageResult = webBuilder.endpoints.getPage.select();
export const selectGetTemplatePagesResult =
	webBuilder.endpoints.getTemplatePages.select();
export const selectAddTemplateResult =
	webBuilder.endpoints.addTemplate.select();
export const selectUpdateTemplateResult =
	webBuilder.endpoints.updateTemplate.select();
export const selectUpdatePageContentResult =
	webBuilder.endpoints.updatePageContent.select();
export const selectDeleteTemplateResult =
	webBuilder.endpoints.deleteTemplate.select();
export const selectCustomisedTemplateResult =
	webBuilder.endpoints.customisedTemplate.select();
export const selectGetCustomisedPagesResult =
	webBuilder.endpoints.getCustomisedPages.select();
export const selectGetCustomisedPageResult =
	webBuilder.endpoints.getCustomisedPage.select();
export const selectUpdatecustomizedTemplateResult =
	webBuilder.endpoints.updatecustomizedTemplate.select();
