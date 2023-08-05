import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../utils/constants";

export interface User {
  id: number;
  name: string;
  image: string;
  placeCount: number;
}

export const usersApi = createApi({
  reducerPath: "users",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
  }),
  endpoints(builder) {
    return {
      fetchUsers: builder.query({
        query: () => {
          return {
            method: "GET",
            url: "/",
          };
        },
      }),
    };
  },
});

export const { useFetchUsersQuery } = usersApi;
