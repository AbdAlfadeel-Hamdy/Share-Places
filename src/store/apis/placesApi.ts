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
  tagTypes: ["Place"],
  endpoints(builder) {
    return {
      // Fetch Places
      fetchPlaces: builder.query({
        providesTags: ["Place"],
        query: (userId: string | undefined) => {
          return {
            method: "GET",
            url: `/places/user/${userId}`,
          };
        },
      }),
      // Fetch Place
      fetchPlace: builder.query({
        providesTags: ["Place"],
        query: (placeId: string | undefined) => {
          return {
            method: "GET",
            url: `/places/${placeId}`,
          };
        },
      }),
      // Add New Place
      addPlace: builder.mutation({
        invalidatesTags: (result, error) => (error ? [] : ["Place"]),
        query: (place: {
          title: string;
          description: string;
          address: string;
          creator: string;
        }) => {
          return {
            method: "POST",
            url: `/places`,
            body: {
              title: place.title,
              description: place.description,
              address: place.address,
              creator: place.creator,
            },
          };
        },
      }),
      // Delete Place
      deletePlace: builder.mutation({
        invalidatesTags: (result, error) => (error ? [] : ["Place"]),
        query: (placeId: string) => {
          return {
            method: "DELETE",
            url: `/places/${placeId}`,
          };
        },
      }),
      // Update Place
      updatePlace: builder.mutation({
        invalidatesTags: (result, error) => (error ? [] : ["Place"]),
        query: ({
          id,
          title,
          description,
        }: {
          id: string;
          title: string;
          description: string;
        }) => {
          return {
            method: "PATCH",
            url: `/places/${id}`,
            body: {
              title,
              description,
            },
          };
        },
      }),
    };
  },
});

export const {
  useFetchPlacesQuery,
  useFetchPlaceQuery,
  useAddPlaceMutation,
  useDeletePlaceMutation,
  useUpdatePlaceMutation,
} = placesApi;
