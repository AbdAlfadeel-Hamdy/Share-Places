import { configureStore } from "@reduxjs/toolkit";
import { usersApi, User } from "./apis/usersApi";
import { placesApi, Place } from "./apis/placesApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    [usersApi.reducerPath]: usersApi.reducer,
    [placesApi.reducerPath]: placesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(usersApi.middleware)
      .concat(placesApi.middleware),
});

setupListeners(store.dispatch);

export type { User, Place };
export { useFetchUsersQuery } from "./apis/usersApi";
export {
  useFetchPlacesQuery,
  useFetchPlaceQuery,
  useAddPlaceMutation,
  useDeletePlaceMutation,
  useUpdatePlaceMutation,
} from "./apis/placesApi";
