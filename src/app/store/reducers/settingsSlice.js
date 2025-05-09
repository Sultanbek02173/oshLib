import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    settings: {},
    loading: false,
    error: null,
  },
  reducers: {
    setSettings: (state, action) => {
      state.settings = action.payload;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { setSettings } = settingsSlice.actions;
export const settingReducer = settingsSlice.reducer;