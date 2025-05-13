import { createAction, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import {
  confirmCode,
  getCategory,
  logoutUser,
  sendCode,
  userLogin,
  userRegister,
} from "./authThunks";

const SET_USER = "SET_USER";
const SET_LOGIN = "SET_LOGIN";

const initialState = {
  loading: false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  login: JSON.parse(localStorage.getItem("login")) || null,
  refresh: localStorage.getItem("refresh") || "",
  access: localStorage.getItem("access") || "",
  category: [],
  codeDetail: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    switchingPage: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
      })
      .addCase(userRegister.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload.user || payload;
        state.refresh = payload.tokens?.refresh || "";
        state.access = payload.tokens?.access || "";
      })
      .addCase(userRegister.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          state.error = payload;
        } else {
          state.error = {
            detail: "Не найдено активной учетной записи с указанными данными",
          };
        }
      })

      .addCase(userLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.login = payload;
        state.refresh = payload?.refresh || "";
        state.access = payload?.access || "";
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          state.error = payload;
        } else {
          state.error = { detail: "Что-то пошло не так. Попробуйте снова." };
        }
      })
      .addCase(getCategory.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCategory.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.category = payload;
      })
      .addCase(getCategory.rejected, (state) => {
        state.loading = false;
      })

      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.login = null;
        state.refresh = "";
        state.access = "";
      })

      .addCase(sendCode.pending, (state) => {
        state.pending = true;
      })
      .addCase(sendCode.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.codeDetail = payload;
      })
      .addCase(sendCode.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          state.error = payload;
        } else {
          state.error = { detail: "Что-то пошло не так. Попробуйте снова." };
        }
      })
      .addCase(confirmCode.pending, (state) => {
        state.pending = true;
      })
      .addCase(confirmCode.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.codeDetail = payload;
      })
      .addCase(confirmCode.rejected, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          state.error = payload;
        } else {
          state.error = { detail: "Что-то пошло не так. Попробуйте снова." };
        }
      })

      .addCase(SET_USER, (state, { payload }) => {
        state.user = payload;
      })
      .addCase(SET_LOGIN, (state, { payload }) => {
        state.login = payload;
      });
  },
});

export const { switchingPage } = authSlice.actions;
export const useAuth = () => useSelector((state) => state.auth);
export const setUser = createAction(SET_USER);
export const setLogin = createAction(SET_LOGIN);

export default authSlice.reducer;
