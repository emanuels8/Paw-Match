import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { Mutex } from "async-mutex";
import { env } from "../../../config/env";

const mutex = new Mutex();

const baseQuery = fetchBaseQuery({
  baseUrl: `${env.API_URL}/dogs`,
  credentials: "include",
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let response = null;
  response = await baseQuery(args, api, extraOptions);

  if (response?.error?.originalStatus === 401) {
    if (!mutex.isLocked()) {
      // Token has expired resign in user
      const user = localStorage.getItem("user");
      try {
        //authenticatuion api
        const response = await CustomAxios.post("auth/login", user);

        //if authenticated
        if (response.status === 200) {
          const expirationTime = Date.now() + 3600000;
          localStorage.setItem(
            "user",
            JSON.stringify({
              ...signInData,
              sessionExpiration: expirationTime,
            })
          );
        }
      } catch (error) {
        localStorage.removeItem("user");
        window.location.reload();
      }
    } else {
      // Recall original api
      await mutex.waitForUnlock();
      response = await baseQuery(args, api, extraOptions);
    }
  }
  return response;
};
