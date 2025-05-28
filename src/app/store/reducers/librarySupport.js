import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StoreService from '../../../shared/api/service';

export const librarySupportFetch = createAsyncThunk(
  "librarySupport/fetchData",
  async () => {
    try {
      const response = await StoreService.getSupportData();
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const libraryValuesFetch = createAsyncThunk(
  "librarySupport/fetchValues",
  async () => {
    try {
      const response = await StoreService.getLibraryValues();
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const libraryPartnersFetch = createAsyncThunk(
  "librarySupport/fetchPartners",
  async () => {
    try {
      const response = await StoreService.getPartnersData();
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const libraryPayTypeFetch = createAsyncThunk(
  "librarySupport/fetchPayType",
  async () => {
    try {
      const response = await StoreService.getPayType();
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const libraryTitleFetch = createAsyncThunk(
  "librarySupport/fetchTitle",
  async () => {
    try {
      const response = await StoreService.getLibraryTitle();
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

const initialState = {
  data: [],
  values: [],
  partners: [],
  payType: [],
  titleData: null,
  status: "",
  valuesStatus: "",
  partnersStatus: "",
  payTypeStatus: "",
  error: null,
  valuesError: null,
  partnersError: null,
  payTypeError: null,
};

const librarySupportSlice = createSlice({
  name: "librarySupport",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(librarySupportFetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(librarySupportFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(librarySupportFetch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

      .addCase(libraryValuesFetch.pending, (state) => {
        state.valuesStatus = "loading";
      })
      .addCase(libraryValuesFetch.fulfilled, (state, action) => {
        state.valuesStatus = "succeeded";
        state.values = action.payload;
      })
      .addCase(libraryValuesFetch.rejected, (state, action) => {
        state.valuesStatus = "failed";
        state.valuesError = action.error.message;
      })

      .addCase(libraryPartnersFetch.pending, (state) => {
        state.partnersStatus = "loading";
      })
      .addCase(libraryPartnersFetch.fulfilled, (state, action) => {
        state.partnersStatus = "succeeded";
        state.partners = action.payload;
      })
      .addCase(libraryPartnersFetch.rejected, (state, action) => {
        state.partnersStatus = "failed";
        state.partnersError = action.error.message;
      })

      .addCase(libraryPayTypeFetch.pending, (state) => {
        state.payTypeStatus = "loading";
      })
      .addCase(libraryPayTypeFetch.fulfilled, (state, action) => {
        state.payTypeStatus = "succeeded";
        state.payType = action.payload;
      })
      .addCase(libraryPayTypeFetch.rejected, (state, action) => {
        state.payTypeStatus = "failed";
        state.payTypeError = action.error.message;
      })

      .addCase(libraryTitleFetch.fulfilled, (state, action) => {
        state.titleData = action.payload;
      });
  },
});

export default librarySupportSlice.reducer;
