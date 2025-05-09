import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StoreService from "../../../shared/api/service";
import { useSelector } from "react-redux";

export const fetchServicesData = createAsyncThunk(
  "services/fetchServicesData",
  async () => {
    const data = await StoreService.getServicesData();
    return data;
  }
);

const servicesSlice = createSlice({
  name: "services",
  initialState: {
    data: [],          
    status: "idle",    
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServicesData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServicesData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchServicesData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const useCatalog = () => useSelector((state) => state.services)
export default servicesSlice.reducer;
