import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./RootReducer";
import { dogsApi } from "../../features/dogs/api/dogsApi";

export default configureStore({
  reducer: {
    ...rootReducer,
    [dogsApi.reducerPath]: dogsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true,
      immutableCheck: true,
      serializableCheck: true,
    }).concat(dogsApi.middleware),
});
