import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../../shared/api/Axios";

export const getHeader = createAsyncThunk("/getHeader", async () => {
    try {
        const { data } = await instance.get("/base/header-footer/");
        return data;
    } catch (e) {
        console.log(e);
        throw e;
    }
});

const initialState = {
    data: [],
    loading: false,
    error: null,
};

const headerSlice = createSlice({
    name: "header",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHeader.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getHeader.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getHeader.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    },
});

export default headerSlice.reducer;
