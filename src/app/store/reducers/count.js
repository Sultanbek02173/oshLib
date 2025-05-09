import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
// import axiosApi from "../../../shared/api/AxiosApi";



const initialState = { 
  number: 0,
  list: [],
  loading: false,  
};

const countSlice = createSlice({
  name: "count",
  initialState,
  reducers: {
    increment(state) {
      state.number += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(example.pending, (state) => {
        state.loading = true;
      })
      .addCase(example.fulfilled, (state, { payload }) => {
        state.list = payload;
        state.loading = false;
      })
      .addCase(example.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const example = createAsyncThunk("example", async () => {
  try {
    const { data } = axiosApi.get("example");
    return data;
  } catch (e) {
    console.error(e);
  }
});

export const { increment } = countSlice.actions;
export const useCount = () => useSelector((state) => state.count);
export default countSlice.reducer;


