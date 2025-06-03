// src/store/store.js
import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";

import aboutReducer from "./reducers/aboutSlice";
import afishaSlice from "./reducers/afishaSlice";
import authReducer from "./reducers/auth/auth";
import {
  logoutUser,
  userLogin,
  userRegister,
} from "./reducers/auth/authThunks";
import bannerReducer from "./reducers/BannerSlice";
import bookElectronicReducer from "./reducers/bookElectronic";
import headerReducer from "./reducers/headerSlice";
import homeReducer from "./reducers/home/homeSlice";
import libarySupportReducer from "./reducers/librarySupport";
import newsReducer from "./reducers/news/newsSlice";
import proactivityReducer from "./reducers/proactivitySlice";
import projectBannerReducer from "./reducers/projectBanner";
import projectCategorySlice from "./reducers/projectCategorySlice";
import projectSlice from "./reducers/projectSlice";
import readerReducer from "./reducers/readerSlice";
import regLogSlice from "./reducers/regLogSlice";
import servicesReducer from "./reducers/servicesSlice";
import typeativityReducer from "./reducers/typeativitySlice";
import visuallyReducer from "./reducers/visually";
const localStorageMiddleware = createListenerMiddleware();
localStorageMiddleware.startListening({
  matcher: isAnyOf(userRegister.fulfilled, userLogin.fulfilled),
  effect: (action, listenerApi) => {
    const { user, login, access, refresh } = listenerApi.getState().auth;

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      if (user.tokens) {
        localStorage.setItem("access", user.tokens.access);
      }
    }
    if (login) localStorage.setItem("login", JSON.stringify(login));
    if (access) localStorage.setItem("access", access);

    if (refresh) localStorage.setItem("refresh", refresh);
  },
});

localStorageMiddleware.startListening({
  matcher: isAnyOf(logoutUser.fulfilled),
  effect: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("login");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
  },
});

export const store = configureStore({
  reducer: {
    visually: visuallyReducer,
    project: projectSlice,
    projectBanner: projectBannerReducer,
    project: projectCategorySlice,
    afisha: afishaSlice,
    reader: readerReducer,
    librarySupport: libarySupportReducer,
    bookElectronic: bookElectronicReducer,
    services: servicesReducer,
    about: aboutReducer,
    pro_activity: proactivityReducer,
    type_activity: typeativityReducer,
    auth: authReducer,
    banner: bannerReducer,
    news: newsReducer,
    home: homeReducer,
    header: headerReducer,
    regLog: regLogSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(localStorageMiddleware.middleware),
});
