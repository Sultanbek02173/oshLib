import axios from "axios";
import i18n from "../../i18n/i18n";
import { BASE_URL } from "./constants";

const instance = axios.create({
  baseURL: `${BASE_URL}${i18n.language}/api/v1/`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const lang = i18n.language;
  config.baseURL = `${BASE_URL}${lang}/api/v1/`;
  return config;
});

export default instance;
