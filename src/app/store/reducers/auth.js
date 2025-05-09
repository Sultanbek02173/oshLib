import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "axios";
import instance from "../../../shared/api/Axios";

const SET_USER = "SET_USER";
const SET_LOGIN = "SET_LOGIN";

const initialState = {
  loading: false,
  user: JSON.parse(localStorage.getItem("user")) || null,
  login: JSON.parse(localStorage.getItem("login")) || null,
  refresh: localStorage.getItem("refresh") || "",
  access: localStorage.getItem("access") || "",
  category: [],
  error: null,
};

export const userRegister = createAsyncThunk(
  "/register",
  async (credentials, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      Object.keys(credentials).forEach((key) => {
        if (credentials[key] !== null) {
          formData.append(key, credentials[key]);
        }
      });

      const { data } = await axios.post(
        "http://librarygeekspro.webtm.ru/ru/api/v1/users/register/",
        formData
      );
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const userLogin = createAsyncThunk(
  "/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        "http://librarygeekspro.webtm.ru/ru/api/v1/users/login/",
        credentials
      );
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const logoutUser = createAsyncThunk("/logoutUser", async () => {
  return true;
});

export const getCategory = createAsyncThunk("/getCategory", async () => {
  try {
    const { data } = await instance.get("users/categories/");
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
});

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
        state.user = payload;
        state.refresh = payload?.refresh || "";
        state.access = payload?.access || "";
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
