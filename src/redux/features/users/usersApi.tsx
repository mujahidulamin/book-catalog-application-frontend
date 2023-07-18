/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { api } from "../../api/apiSlice";


//users api

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (data) => ({
        url: `/signup`,
        method: "POST",
        body: data,
      }),
    }),
    signIn: builder.mutation({
      query: (data) => ({
        url: `/login`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = usersApi;
