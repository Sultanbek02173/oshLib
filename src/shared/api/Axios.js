import axios from "axios";
import i18n from "../../i18n/i18n";

const instance = axios.create({
  baseURL: `https://librarygeekspro.webtm.ru/${i18n.language}/api/v1/`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

instance.interceptors.request.use((config) => {
  const lang = i18n.language;
  config.baseURL = `https://librarygeekspro.webtm.ru/${lang}/api/v1/`;
  return config;
});

export default instance;
