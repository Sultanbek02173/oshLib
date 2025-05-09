import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../../shared/api/Axios";

export const fetchProjectBanner = createAsyncThunk(
  "project/fetchProjectBanner",
  async () => {
    const response = await axios.get("/project/our-projects/");
    return response.data?.[0] || {};
  }
);

const projectBannerSlice = createSlice({
  name: "project",
  initialState: {
    data: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectBanner.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProjectBanner.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProjectBanner.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default projectBannerSlice.reducer;
