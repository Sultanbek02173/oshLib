import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../shared/api/Axios";

export const historyFeych = createAsyncThunk(
  "/bookHistory",
  async (bookPage, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("users/read-book/", bookPage, {
        headers: { Authorization: `Bearer ${localStorage.getItem("access")}` },
      });
      // console.log(bookPage);

      return data;
    } catch (e) {
      console.log(e);
      return rejectWithValue(e.response?.data || e.message);
    }
  }
);
