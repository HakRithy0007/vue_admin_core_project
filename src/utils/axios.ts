import axios from "axios";
import { router } from "@/plugins/router";

const baseUrl = import.meta.env.VITE_CNPOKER_API_URL;

const instance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth_token");
  const locale = localStorage.getItem("lang") || "en";
  config.withCredentials = false;

  if (token) {
    config.headers.Authorization = "Bearer " + token;
  } else {
    router.push("/login");
  }

  config.headers["Accept-Language"] = locale;
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 422) {
      localStorage.removeItem("auth_token");
      router.push("/login");
    }
    return Promise.reject(error);
  }
);

export default instance;
