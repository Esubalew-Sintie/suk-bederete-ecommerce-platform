import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authSlice = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/auth/' }),
  tagTypes: ['Auth'],
  endpoints: (builder) => ({
    // Login mutation
    login: builder.mutation({
      query: (formData) => {
        return {
          url: 'login/',
          method: 'POST',
          body: formData,
        };
      },
      invalidatesTags: ['Auth'],
    }),

    // Registration mutation
    register: builder.mutation({
      query: (formData) => ({
        url: 'register/',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authSlice;
