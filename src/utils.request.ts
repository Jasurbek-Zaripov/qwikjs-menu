import axios from "axios";
import { BASE_URL } from "~/config/config";
import { RequestEventAction } from "@builder.io/qwik-city";

export const axiosInstance = (request: RequestEventAction["request"]) => {
  return axios.create({
    baseURL: BASE_URL,
    withCredentials: true,
    headers: {
      "content-type": "application/json",
      cookie: request.headers.get("cookie"),
    },
  });
};
