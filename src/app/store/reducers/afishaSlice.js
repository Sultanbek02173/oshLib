import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../shared/api/Axios";
import { useSelector } from "react-redux";

export const afishaFetch = createAsyncThunk("events/afishaData", async () => {
  try {
    const { data } = await instance.get("afisha/events/");
    return data;
  } catch (error) {
    console.error(error);
  }
});

export const getAfishaBanner = createAsyncThunk(
  "/getAfishaBanner",
  async () => {
    try {
      const { data } = await instance.get("afisha/afirha/");
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

const initialState = {
  data: [],
  banner: [],
  status: "idle",
  error: null,
};

const afishaSlice = createSlice({
  name: "afisha",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(afishaFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(afishaFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(afishaFetch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getAfishaBanner.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAfishaBanner.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.banner = action.payload;
      })
      .addCase(getAfishaBanner.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const useAfisha = () => useSelector((state) => state.afisha);

export default afishaSlice.reducer;
