import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: "",
  credentials: "include",
});

export const baseQueryWithReauth = async ({ args, api, extraOptions }) => {
  let response = null;
  response = await baseQuery(args, api, extraOptions);
  const { signIn } = useAuth();

  if (response?.error?.status === 401) {
    if (!mutex.isLocked()) {
      // Token has expired sign in user
      const user = localStorage.getItem("user");
      signIn(user);
    } else {
      // Recall original api
      await mutex.waitForUnlock();
      response = await baseQuery(args, api, extraOptions);
    }
  }
  return response;
};
