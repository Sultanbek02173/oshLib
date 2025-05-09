// src/store/reducers/projectSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import storeService from "../../../shared/api/service"; // Corrected import

export const fetchProjectDetail = createAsyncThunk(
  "project/fetchProjectDetail",
  async (id, { rejectWithValue }) => {
    try {
      const response = await storeService.getProjectDetail(id);
      return response;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        status: error.response?.status,
        data: error.response?.data || null,
      });
    }
  }
);

const projectSlice = createSlice({
  name: "project",
  initialState: {
    projects: [],
    projectDetail: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjectDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjectDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.projectDetail = action.payload;
      })
      .addCase(fetchProjectDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default projectSlice.reducer;