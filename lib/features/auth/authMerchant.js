import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
export const authSlice = createApi({
	reducerPath: "auth",
	baseQuery: fetchBaseQuery({baseUrl: "http://127.0.0.1:8000/auth"}),
	tagTypes: ["Auth"],
  endpoints: (builder) => ({
    signIn: builder.mutation({
      query: ({...content}) => ({
        url: `/login/`,
        method: "POST",
        body:content        
      }),
      invalidatesTags:["Auth"],
    }),
    signUp: builder.mutation({
      query: ({...content}) => ({
        url: `/register/`,
        method: "POST",
        body:content
        
      }),
      invalidatesTags:["Auth"],

    }),
   
	}),
});


export const {useSignInMutation,useSignUpMutation}=authSlice