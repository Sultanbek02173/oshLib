import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StoreService from "../../../shared/api/service";

export const proactivityFetch = createAsyncThunk(
  "pro_activity/fetchProData",
  async () => {
    const response = await StoreService.getfetcProData();
    return response.data; 
  }
);

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

const proactivitySlice = createSlice({
  name: "pro_activity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(proactivityFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(proactivityFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(proactivityFetch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default proactivitySlice.reducer;