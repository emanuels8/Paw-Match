import axios from "axios";
import { env } from "./env";

export const CustomAxios = axios.create({
  baseURL: env.API_URL,
  withCredentials: true,
});
