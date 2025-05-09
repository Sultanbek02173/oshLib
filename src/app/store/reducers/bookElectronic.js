import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StoreService from '../../../shared/api/service';

export const fetchBookElectronic = createAsyncThunk(
  "bookElectronic/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await StoreService.getBookElectronicData();
      // console.log(response);

      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

export const bookPartnersFetch = createAsyncThunk(
  "bookElectronic/fetchPartners",
  async (_, { rejectWithValue }) => {
    try {
      const response = await StoreService.getPartnersData();
      
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  books: [],
  partners: [],
  status: "",
  error: null,
};

const bookElectronicSlice = createSlice({
  name: "bookElectronic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookElectronic.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchBookElectronic.fulfilled, (state, action) => {
        state.status = "succeeded";
        
        state.books = action.payload;
      })
      .addCase(fetchBookElectronic.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })

      .addCase(bookPartnersFetch.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(bookPartnersFetch.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.partners = action.payload;
      })
      .addCase(bookPartnersFetch.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      });
  },
});

export default bookElectronicSlice.reducer;
