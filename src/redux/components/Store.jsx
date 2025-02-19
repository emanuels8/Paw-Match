import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./RootReducer";
import { dogsApi } from "../../features/dogs/api/dogs/dogsApi";
import { locationsApi } from "../../features/dogs/api/location/locationApi";

export default configureStore({
  reducer: {
    ...rootReducer,
    [dogsApi.reducerPath]: dogsApi.reducer,
    [locationsApi.reducerPath]: locationsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: true,
      serializableCheck: true,
    }).concat(dogsApi.middleware, locationsApi.middleware),
});
