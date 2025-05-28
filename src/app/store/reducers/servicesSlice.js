import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StoreService from "../../../shared/api/service";

export const fetchServicesData = createAsyncThunk(
  "services/fetchServicesData", // <-- название поменял на логичное
  async () => {
    const response = await StoreService.getServicesData();
    // console.log(response, "response from API"); // Для отладки
    return response;
  }
);

export const fetchServicesBannerData = createAsyncThunk(
  "services/fetchServicesBannerData",
  async () => {
    const response = await StoreService.getServicesBannerData();
    return response[0];
  }
);

export const fetchServicesBasicData = createAsyncThunk(
  "services/fetchServicesBasicData",
  async () => {
    const response = await StoreService.getServicesBasicData();
    return response;
  }
);
const servicesSlice = createSlice({
  name: "services",
  initialState: {
    data: [],
    baner: [],
    basic: [],
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
    builder
      .addCase(fetchServicesBannerData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServicesBannerData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.banner = action.payload;
      })
      .addCase(fetchServicesBannerData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(fetchServicesBasicData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchServicesBasicData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.basic = action.payload;
      })
      .addCase(fetchServicesBasicData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default servicesSlice.reducer;
