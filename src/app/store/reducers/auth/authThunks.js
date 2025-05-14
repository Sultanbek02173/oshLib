import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "../../../../shared/api/Axios";

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

      const { data } = await instance.post("users/register/", formData);
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
      const { data } = await instance.post("users/login/", credentials);
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const sendCode = createAsyncThunk(
  "/sendCode",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await instance.post(
        "users/password-reset/send-code/",
        email
      );
      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);

export const confirmCode = createAsyncThunk(
  "/confirmCode",
  async (newData, { rejectWithValue }) => {
    try {
      const { data } = await instance.post(
        "users/password-reset/confirm/",
        newData
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
