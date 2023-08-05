import { configureStore } from "@reduxjs/toolkit";
import { usersApi, User } from "./apis/usersApi";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
  },
});
export type { User };
export { useFetchUsersQuery } from "./apis/usersApi";
