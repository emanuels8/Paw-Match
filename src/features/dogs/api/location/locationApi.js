import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./BaseQuery";

export const locationsApi = createApi({
  reducerPath: "locationsApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    locations: builder.mutation({
      query: (zipCodes) => ({
        url: `/`,
        method: "POST",
        body: zipCodes,
      }),
      transformResponse: (response) => response,
    }),
    searchLocations: builder.query({
      query: ({
        city = "",
        states = [],
        geoBoundingBox = {
          top: { lat: 0, lon: 0 },
          left: { lat: 0, lon: 0 },
          bottom: { lat: 0, lon: 0 },
          right: { lat: 0, lon: 0 },
        },
        size = 10,
        from = 0,
      }) => {
        const queryParams = new URLSearchParams();

        if (city) queryParams.set("city", city);
        if (states.length)
          states.forEach((state) => queryParams.append("states", state));
        if (size) queryParams.set("size", size >= 100 ? 100 : size);
        if (from) queryParams.set("from", from);

        if (geoBoundingBox) {
          if (geoBoundingBox.top) {
            queryParams.set("geoBoundingBox.top.lat", geoBoundingBox.top.lat);
            queryParams.set("geoBoundingBox.top.lon", geoBoundingBox.top.lon);
          }
          if (geoBoundingBox.bottom) {
            queryParams.set(
              "geoBoundingBox.bottom.lat",
              geoBoundingBox.bottom.lat
            );
            queryParams.set(
              "geoBoundingBox.bottom.lon",
              geoBoundingBox.bottom.lon
            );
          }
          if (geoBoundingBox.left) {
            queryParams.set("geoBoundingBox.left.lat", geoBoundingBox.left.lat);
            queryParams.set("geoBoundingBox.left.lon", geoBoundingBox.left.lon);
          }
          if (geoBoundingBox.right) {
            queryParams.set(
              "geoBoundingBox.right.lat",
              geoBoundingBox.right.lat
            );
            queryParams.set(
              "geoBoundingBox.right.lon",
              geoBoundingBox.right.lon
            );
          }
        }

        return {
          url: `/search?${queryParams.toString()}`,
          method: "GET",
        };
      },
      transformResponse: (response) => response,
    }),
  }),
});

export const { useLocationsMutation, useSearchLocationsQuery } = locationsApi;
