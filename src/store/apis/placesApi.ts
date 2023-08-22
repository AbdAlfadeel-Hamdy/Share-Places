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
          image: File;
          token: string;
        }) => {
          const formData = new FormData();
          formData.append("title", place.title);
          formData.append("description", place.description);
          formData.append("address", place.address);
          formData.append("image", place.image);
          return {
            method: "POST",
            url: `/places`,
            body: formData,
            headers: {
              Authorization: `Bearer ${place.token}`,
            },
          };
        },
      }),
      // Delete Place
      deletePlace: builder.mutation({
        invalidatesTags: (result, error) => (error ? [] : ["Place"]),
        query: ({ placeId, token }: { placeId: string; token: string }) => {
          return {
            method: "DELETE",
            url: `/places/${placeId}`,
            headers: {
              Authorization: `Bearer ${token}`,
            },
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
          token,
        }: {
          id: string;
          title: string;
          description: string;
          token: string;
        }) => {
          return {
            method: "PATCH",
            url: `/places/${id}`,
            body: {
              title,
              description,
            },
            headers: {
              Authorization: `Bearer ${token}`,
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
