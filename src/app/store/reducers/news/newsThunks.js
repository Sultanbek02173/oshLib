import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../../shared/api/Axios";

export const getDailyNews = createAsyncThunk("/getDailyNews", async () => {
  try {
    const { data } = await instance.get("news/daily-news/");
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const getNextDailyNews = createAsyncThunk(
  "news/getNextDailyNews",
  async (nextUrl) => {
    try {
      const { data } = await instance.get(nextUrl);
      return data;
    } catch (error) {
      console.error("Error fetching next page of books:", error);
      throw error;
    }
  }
);

export const getPreviousDailyNews = createAsyncThunk(
  "news/getPreviousDailyNews",
  async (previousUrl) => {
    try {
      const { data } = await instance.get(previousUrl);
      return data;
    } catch (error) {
      console.error("Error fetching previous page of books:", error);
      throw error;
    }
  }
);

export const getBooksArrivals = createAsyncThunk(
  "/getBooksArrivals",
  async () => {
    try {
      const { data } = await instance.get("news/book-arrivals/");
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);
export const getDetailEvent = createAsyncThunk(
  "/getDetailEvent",
  async (id) => {
    try {
      const { data } = await instance.get(`news/events-news/${id}/`);
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);
export const getNewsDetail = createAsyncThunk("/getNewsDetail", async (id) => {
  try {
    const { data } = await instance.get(`news/news/${id}/`);
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const getNewsEvents = createAsyncThunk("/getNewsEvents", async () => {
  try {
    const { data } = await instance.get("news/events-news/");
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const getNewsAboutCmi = createAsyncThunk(
  "/getNewsAboutCmi",
  async () => {
    try {
      const { data } = await instance.get("news/media-coverage/");
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);
export const getNewsLogo = createAsyncThunk("/getNewsLogo", async () => {
  try {
    const { data } = await instance.get("news/news/");
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const getDailyNewsNo = createAsyncThunk("/getDailyNewsNo", async () => {
  try {
    const { data } = await instance.get("news/daily-no-pagination/");
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
});
