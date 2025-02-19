import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./BaseQuery";

//It is recommended to have the tag types in rtk query documentation
const tagTypes = ["dogs"];

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  tagTypes: tagTypes,
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => {
    return {
      get: builder.query({
        query: (data = {}) => {
          let query = data?.query || "";
          if (data?.queryFilter) {
            // turns queryFilter object into a query string
            query = `${query}${data?.page ? `?page=${data?.page}` : "?page=1"}${
              data?.size ? `&size=${data?.size}` : "&size=100"
            }&${new URLSearchParams(data?.queryFilter).toString()}`;
          }
          return query;
        },

        providesTags: (data) => {
          return data.tags;
        },

        transformErrorResponse: (response) => {
          return response;
        },
      }),
    };
  },
});

export const { useGetQuery } = apiSlice;
