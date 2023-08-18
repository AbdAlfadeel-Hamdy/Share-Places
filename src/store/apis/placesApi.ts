import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Place {
  id: string;
  title: string;
  image: string;
  description: string;
  address: string;
  creator: string;
  location: {
    lat: number;
    lng: number;
  };
}

export const placesApi = createApi({
  reducerPath: "places",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
    credentials: "include",
  }),
  endpoints(builder) {
    return {
      fetchPlaces: builder.query({
        query: (userId: string | undefined) => {
          return {
            method: "GET",
            url: `/places/user/${userId}`,
          };
        },
      }),
    };
  },
});

export const { useFetchPlacesQuery } = placesApi;
