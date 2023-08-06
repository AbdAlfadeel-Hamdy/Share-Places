import { configureStore } from "@reduxjs/toolkit";
import { usersApi, User } from "./apis/usersApi";
import { Place } from "./apis/placesApi";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
  },
});
export type { User, Place };
export { useFetchUsersQuery } from "./apis/usersApi";
