import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StoreService from "../../../shared/api/service";

export const typeativityFetch = createAsyncThunk(
  "type_activity/fetchTypeData",
  async () => {
    const response = await StoreService.getfetctypeData();
    return response.data;
  }
);

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

const typeativitySlice = createSlice({
  name: "type_activity",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(typeativityFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(typeativityFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(typeativityFetch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default typeativitySlice.reducer;