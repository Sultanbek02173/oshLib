import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import instance from "../../../shared/api/Axios";
import axios from "axios";
import i18n from "../../../i18n/i18n";

const token = localStorage.getItem("access");

export const readerFetch = createAsyncThunk("banner/bannerData", async () => {
  try {
    const { data } = await instance("/Graphic_work/banner/");
    // console.log("Banner:", data);
    return data;
  } catch (error) {
    console.error(error);
  }
});

export const readerGraphicFetch = createAsyncThunk(
  "banner/graphicBannerData",
  async () => {
    try {
      const { data } = await instance("/Graphic_work/graphic_work/");
      // console.log("Graphic:", data);
      return data;
    } catch (error) {
      return error;
    }
  }
);

export const readerGraphicDirectorFetch = createAsyncThunk(
  "banner/graphicDirectorBannerData",
  async () => {
    try {
      const { data } = await instance("/Graphic_work/appointment/");
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const readerRatingFetch = createAsyncThunk(
  "banner/ratingUsersData",
  async () => {
    try {
      const { data } = await axios.get(
        `http://librarygeekspro.webtm.ru/${i18n.language}/api/v1/users/raiting/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        }
      );
      // console.log("Users:", data);
      // console.log("Users:", token);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const readerTitleFetch = createAsyncThunk(
  "banner/titleBannerData",
  async () => {
    try {
      const { data } = await instance("/Graphic_work/titles/");
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const readerVideoFetch = createAsyncThunk(
  "banner/readerVideoData",
  async () => {
    try {
      const { data } = await instance("/banner/readbase/");
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

const initialState = {
  bannerData: [],
  bannerStatus: "idle",
  bannerError: null,

  graphicData: [],
  graphicStatus: "idle",
  graphicError: null,

  graphicDirector: [],

  graphicVideo: [],

  userData: [],
  userStatus: "idle",
  userError: null,

  titleData: [],
  titleStatus: "idle",
  titleError: null,
};

const readerSlice = createSlice({
  name: "reader",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(readerFetch.pending, (state) => {
        state.bannerStatus = "loading";
      })
      .addCase(readerFetch.fulfilled, (state, action) => {
        state.bannerStatus = "succeeded";
        state.bannerData = action.payload;
      })
      .addCase(readerFetch.rejected, (state, action) => {
        state.bannerStatus = "failed";
        state.bannerError = action.error.message;
      })

      .addCase(readerGraphicDirectorFetch.fulfilled, (state, action) => {
        state.graphicDirector = action.payload;
      })

      .addCase(readerVideoFetch.fulfilled, (state, { payload }) => {
        state.graphicVideo = payload;
      })

      .addCase(readerGraphicFetch.pending, (state) => {
        state.graphicStatus = "loading";
      })
      .addCase(readerGraphicFetch.fulfilled, (state, action) => {
        state.graphicStatus = "succeeded";
        state.graphicData = action.payload;
      })
      .addCase(readerGraphicFetch.rejected, (state, action) => {
        state.graphicStatus = "failed";
        state.graphicError = action.error.message;
      })

      .addCase(readerRatingFetch.pending, (state) => {
        state.userStatus = "loading";
      })
      .addCase(readerRatingFetch.fulfilled, (state, action) => {
        state.userStatus = "succeeded";
        state.userData = action.payload;
      })
      .addCase(readerRatingFetch.rejected, (state, action) => {
        state.userStatus = "failed";
        state.userError = action.error.message;
      })

      .addCase(readerTitleFetch.pending, (state) => {
        state.titleStatus = "loading";
      })
      .addCase(readerTitleFetch.fulfilled, (state, action) => {
        state.titleStatus = "succeeded";
        state.titleData = action.payload;
      })
      .addCase(readerTitleFetch.rejected, (state, action) => {
        state.titleStatus = "failed";
        state.titleError = action.error.message;
      });
  },
});

export default readerSlice.reducer;
