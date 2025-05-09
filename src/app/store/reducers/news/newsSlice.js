import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import {
  getBooksArrivals,
  getDailyNews,
  getDailyNewsNo,
  getDetailEvent,
  getNewsAboutCmi,
  getNewsDetail,
  getNewsEvents,
  getNewsLogo,
  getNextDailyNews,
  getPreviousDailyNews,
} from "./newsThunks";

const initialState = {
  logo: [],
  list: [],
  noPagination: [],
  item: null,
  arrivals: [],
  newEvents: [],
  listAboutCmi: [],
  eventDetail: null,
  loading: false,
  pagination: {
    count: 0,
    next: null,
    previous: null,
  },
  currentPage: 1,
  totalPages: 1,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getDailyNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getDailyNews.fulfilled, (state, action) => {
        const { results, count, next, previous } = action.payload;
        state.loading = false;
        state.list = results;
        state.pagination = { count, next, previous };
        state.currentPage = 1;
        state.totalPages = Math.ceil(count / results.length);
      })
      .addCase(getDailyNews.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getNextDailyNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getNextDailyNews.fulfilled,
        (state, { payload: { results, count, next, previous } }) => {
          state.list = results;
          state.pagination = { count, next, previous };
          state.loading = false;
          state.currentPage += 1;
        }
      )
      .addCase(getNextDailyNews.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getPreviousDailyNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        getPreviousDailyNews.fulfilled,
        (state, { payload: { results, count, next, previous } }) => {
          state.list = results;
          state.pagination = { count, next, previous };
          state.loading = false;
          state.currentPage -= 1;
        }
      )
      .addCase(getPreviousDailyNews.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getBooksArrivals.pending, (state) => {
        state.loading = false;
      })
      .addCase(getBooksArrivals.fulfilled, (state, { payload }) => {
        state.loading = true;
        state.arrivals = payload;
      })
      .addCase(getBooksArrivals.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getNewsEvents.pending, (state) => {
        state.loading = false;
      })
      .addCase(getNewsEvents.fulfilled, (state, { payload }) => {
        state.loading = true;
        state.newEvents = payload;
      })
      .addCase(getNewsEvents.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getNewsAboutCmi.pending, (state) => {
        state.loading = false;
      })
      .addCase(getNewsAboutCmi.fulfilled, (state, { payload }) => {
        state.loading = true;
        state.listAboutCmi = payload;
      })
      .addCase(getNewsAboutCmi.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getNewsDetail.pending, (state) => {
        state.loading = false;
      })
      .addCase(getNewsDetail.fulfilled, (state, { payload }) => {
        state.loading = true;
        state.item = payload;
      })
      .addCase(getNewsDetail.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getDetailEvent.pending, (state) => {
        state.loading = false;
      })
      .addCase(getDetailEvent.fulfilled, (state, { payload }) => {
        state.loading = true;
        state.eventDetail = payload;
      })
      .addCase(getDetailEvent.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getNewsLogo.pending, (state) => {
        state.loading = false;
      })
      .addCase(getNewsLogo.fulfilled, (state, { payload }) => {
        state.loading = true;
        state.logo = payload;
      })
      .addCase(getNewsLogo.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getDailyNewsNo.pending, (state) => {
        state.loading = false;
      })
      .addCase(getDailyNewsNo.fulfilled, (state, { payload }) => {
        state.loading = true;
        state.noPagination = payload;
      })
      .addCase(getDailyNewsNo.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const useNews = () => useSelector((state) => state.news);
export default newsSlice.reducer;
