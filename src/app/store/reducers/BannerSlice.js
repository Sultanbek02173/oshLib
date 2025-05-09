import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import instance from "../../../shared/api/Axios";

const initialState = {
  list: [],
  loading: false,
};

export const getBannerLogo = createAsyncThunk("/getBannerLogo", async () => {
  try {
    const { data } = await instance.get("base/logo/");
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
});

const BannerSlice = createSlice({
  name: "banner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBannerLogo.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBannerLogo.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.list = payload;
      })
      .addCase(getBannerLogo.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const useBanner = () => useSelector((state) => state.banner);
export default BannerSlice.reducer;
