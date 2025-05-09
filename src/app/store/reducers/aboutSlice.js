import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StoreService from "../../../shared/api/service";

export const fetchAboutData = createAsyncThunk(
  "about/fetchAboutData",
  async () => {
    const response = await StoreService.getAboutData();
    return response[0];
  }
);

export const fetchManagementData = createAsyncThunk(
  "about/fetchManagementData",
  async () => {
    const response = await StoreService.getManagementData();
    return response;
  }
);

export const fetchStructureData = createAsyncThunk(
  "about/fetchStructureData",
  async () => {
    const response = await StoreService.getStructureData();
    return response;
  }
);

export const fetchActivitiesData = createAsyncThunk(
  "about/fetchActivitiesData",
  async () => {
    const response = await StoreService.getActivitiesData();
    return response;
  }
);

export const fetchHistoryData = createAsyncThunk(
  "about/fetchHistoryData",
  async () => {
    const response = await StoreService.getHistoryData();
    return response;
  }
);

export const fetchAboutTitlesData = createAsyncThunk(
  "about/fetchAboutTitlesData",
  async () => {
    const response = await StoreService.getAboutTitlesData();    
    return response;
  }
)

const aboutSlice = createSlice({
  name: "about",
  initialState: {
    data: null,
    dataStatus: "idle",
    dataError: null,

    management: [],
    managementStatus: "idle",
    managementError: null,

    structure: [],
    structureStatus: "idle",
    structureError: null,

    activities: [],
    activitiesStatus: "idle",
    activitiesError: null,

    history: [],
    historyStatus: 'idle',
    historyError: null,

    aboutTitles: {},
    aboutTitlesStatus: 'idle',
    aboutTitlesError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutData.pending, (state) => {
        state.dataStatus = "loading";
      })
      .addCase(fetchAboutData.fulfilled, (state, action) => {
        state.dataStatus = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchAboutData.rejected, (state, action) => {
        state.dataStatus = "failed";
        state.dataError = action.error.message;
      });
    builder
      .addCase(fetchManagementData.pending, (state) => {
        state.managementStatus = "loading";
      })
      .addCase(fetchManagementData.fulfilled, (state, action) => {
        state.managementStatus = "succeeded";
        state.management = action.payload;
      })
      .addCase(fetchManagementData.rejected, (state, action) => {
        state.managementStatus = "failed";
        state.managementError = action.error.message;
      });

    builder
      .addCase(fetchStructureData.pending, (state) => {
        state.structureStatus = "loading";
      })
      .addCase(fetchStructureData.fulfilled, (state, action) => {
        state.structureStatus = "succeeded";
        state.structure = action.payload;
      })
      .addCase(fetchStructureData.rejected, (state, action) => {
        state.structureStatus = "failed";
        state.structureError = action.error.message;
      })
    builder
        .addCase(fetchActivitiesData.pending, (state) => {
          state.activitiesStatus = "loading";
        })
        .addCase(fetchActivitiesData.fulfilled, (state, action) => {
          state.activitiesStatus = "succeeded";
          state.activities = action.payload;
        })
        .addCase(fetchActivitiesData.rejected, (state, action) => {
          state.activitiesStatus = "failed";
          state.activitiesError = action.error.message;
        })
      builder
        .addCase(fetchHistoryData.pending, (state) => {
          state.historyStatus = "loading";
        })
        .addCase(fetchHistoryData.fulfilled, (state, action) => {
          state.historyStatus = "succeeded";
          state.history = action.payload;
        })
        .addCase(fetchHistoryData.rejected, (state, action) => {
          state.historyStatus = "failed";
          state.historyError = action.error.message;
        })
      builder
        .addCase(fetchAboutTitlesData.pending, (state) => {
          state.aboutTitlesStatus = "loading";
        })
        .addCase(fetchAboutTitlesData.fulfilled, (state, action) => {
          state.aboutTitlesStatus = "succeeded";
          state.aboutTitles = action.payload;
        })
        .addCase(fetchAboutTitlesData.rejected, (state, action) => {
          state.aboutTitlesStatus = "failed";
          state.aboutTitlesError = action.error.message;
        })
    },
});

export default aboutSlice.reducer;
