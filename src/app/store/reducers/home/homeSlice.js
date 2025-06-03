import { createSlice } from "@reduxjs/toolkit";
import {
  doSearch,
  getBooksRating,
  getCatalogs,
  getCollection,
  getReadingRating,
  getHomeTitles,
} from "./homeThunks";
import { useSelector } from "react-redux";

const initialState = {
  collection: [],
  readerRatings: [],
  booksRatings: [],
  search: [],
  loading: false,
  catalogs: [],
  ratingTitles: []
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    clearSearch(state) {
      state.search = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCollection.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCollection.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.collection = payload;
      })
      .addCase(getCollection.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getReadingRating.pending, (state) => {
        state.loading = true;
      })
      .addCase(getReadingRating.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.readerRatings = payload;
      })
      .addCase(getReadingRating.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getBooksRating.pending, (state) => {
        state.loading = true;
      })
      .addCase(getBooksRating.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.booksRatings = payload;
      })
      .addCase(getBooksRating.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getCatalogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCatalogs.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.catalogs = payload;
      })
      .addCase(getCatalogs.rejected, (state) => {
        state.loading = false;
      })

      .addCase(doSearch.pending, (state) => {
        state.loading = true;
      })
      .addCase(doSearch.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.search = payload;
      })
      .addCase(doSearch.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getHomeTitles.pending, (state) => {
        state.loading = true;
      })
      .addCase(getHomeTitles.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.ratingTitles = payload;
      })
      .addCase(getHomeTitles.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { clearSearch } = homeSlice.actions;
export const useHome = () => useSelector((state) => state.home);
export default homeSlice.reducer;
