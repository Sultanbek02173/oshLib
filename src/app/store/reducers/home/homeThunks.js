import { createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../../shared/api/Axios";

export const getCollection = createAsyncThunk("/getCollection", async () => {
  try {
    const { data } = await instance.get("base/weofferviewing/");
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const getReadingRating = createAsyncThunk(
  "/getReadingRating",
  async () => {
    try {
      const { data } = await instance.get("base/readingrating/");
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

export const getBooksRating = createAsyncThunk("/getBooksRating", async () => {
  try {
    const { data } = await instance.get("base/booksrating/");
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
});

export const doSearch = createAsyncThunk(
  "search/doSearch",
  async (searchParams) => {
    try {
      const { data } = await instance.get("base/search/", {
        params: searchParams,
      });
      return data;
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
);

export const getHomeTitles = createAsyncThunk("home/getTitles", async () => {
  try {
    const { data } = await instance("banner/titles/");
    return data;
  } catch (e) {
    console.error(e);
    throw e;
  }
});

export const getCatalogs = createAsyncThunk("/getCatalogs", async () => {
  try {
    const { data } = await instance.get("base/catalogs/");
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
});
