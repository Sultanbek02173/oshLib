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

const servicesSlice = createSlice({
  name: "services",
  initialState: {
    data: [],           
    status: "idle",     
    error: null,
    banner: {},
    
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
  },
});

export default servicesSlice.reducer;
