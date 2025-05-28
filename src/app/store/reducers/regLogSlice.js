import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StoreService from "../../../shared/api/service";

export const regLogFetch = createAsyncThunk(
  "Register_login//fetchRegLogData",
  async () => {
    const response = await StoreService.getRegLogData();
    return response[0]; 
  }
);

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

const regLogSlice = createSlice({
  name: "pro_activity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(regLogFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(regLogFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(regLogFetch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default regLogSlice.reducer;