// src/store/store.js
import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";

import afishaSlice from "./reducers/afishaSlice";
import authReducer, {
  userRegister,
  userLogin,
  logoutUser,
} from "./reducers/auth";
import { settingReducer } from "./reducers/settingsSlice";
import readerReducer from "./reducers/readerSlice";
import libarySupportReducer from "./reducers/librarySupport";
import bookElectronicReducer from "./reducers/bookElectronic";
import servicesReducer from "./reducers/servicesSlice";
import aboutReducer from "./reducers/aboutSlice";
import proactivityReducer from "./reducers/proactivitySlice";
import typeativityReducer from "./reducers/typeativitySlice";
import bannerReducer from "./reducers/BannerSlice";
import newsReducer from "./reducers/news/newsSlice";
import visuallyReducer from "./reducers/visually";
import projectSlice from "./reducers/projectSlice";
import projectCategorySlice from "./reducers/projectCategorySlice";
import homeReducer from "./reducers/home/homeSlice";
import projectBannerReducer from "./reducers/projectBanner";

const localStorageMiddleware = createListenerMiddleware();
localStorageMiddleware.startListening({
  matcher: isAnyOf(userRegister.fulfilled, userLogin.fulfilled),
  effect: (action, listenerApi) => {
    const { user, login, access, refresh } = listenerApi.getState().auth;

    if (user) localStorage.setItem("user", JSON.stringify(user));
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
    home: homeReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(localStorageMiddleware.middleware),
});