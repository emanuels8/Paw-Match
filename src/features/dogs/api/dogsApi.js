import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../api/BaseQuery";

export const dogsApi = createApi({
  reducerPath: "dogsApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getDogs: builder?.query({
      query: () => {
        return {
          url: `/breeds`,
          method: "GET",
        };
      },
      transformResponse: (response) => {
        return response;
      },
    }),
    searchDogs: builder.query({
      query: ({
        breeds = [],
        zipCodes = [],
        ageMin = "",
        ageMax = "",
        size = 10,
        from = 0,
        sort = "breed:asc",
      }) => {
        const queryParams = new URLSearchParams();

        if (breeds?.length)
          breeds.forEach((breed) => queryParams.append("breeds", breed));
        if (zipCodes?.length)
          zipCodes.forEach((zip) => queryParams.append("zipCodes", zip));
        if (ageMin) queryParams.set("ageMin", ageMin);
        if (ageMax) queryParams.set("ageMax", ageMax);
        if (size) queryParams.set("size", size >= 100 ? 100 : size);
        if (from) queryParams.set("from", from);
        if (sort) queryParams.set("sort", sort);
        return {
          url: `/search?${queryParams.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response,
    }),
    postDogs: builder.mutation({
      query: (resultIds) => ({
        url: `/`,
        method: "POST",
        body: resultIds,
      }),
      transformResponse: (response) => response,
    }),
    dogsMatch: builder.mutation({
      query: (favoriteDogsIds) => ({
        url: `/match`,
        method: "POST",
        body: favoriteDogsIds,
      }),
      transformResponse: (response) => response,
    }),
  }),
});

export const {
  useGetDogsQuery,
  useSearchDogsQuery,
  usePostDogsMutation,
  useDogsMatchMutation,
} = dogsApi;
