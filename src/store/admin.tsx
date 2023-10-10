import { createSlice } from "@reduxjs/toolkit";

export type AdminState = {
    testProperty: unknown;
};

const initialState: AdminState = {
    testProperty: "testProperty",
};

const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
});

// export const { } = adminSlice.actions;

export default adminSlice.reducer;

export const adminSelector = (state: { admin: AdminState }) => state.admin;
