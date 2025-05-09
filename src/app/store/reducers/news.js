import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

export const fetchNewsData = createAsyncThunk(
    "news/fetchNewsData",
    async () => {
      const response = await StoreService.getNewsData();
      return response;
    }
  );