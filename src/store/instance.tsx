import { createSlice } from "@reduxjs/toolkit";

export type InstanceState = {
    testProperty: unknown;
};

const initialState: InstanceState = {
    testProperty: "testProperty",
};

const instanceSlice = createSlice({
    name: "instance",
    initialState,
    reducers: {},
});

// export const { } = instanceSlice.actions;

export default instanceSlice.reducer;

export const instanceSelector = (state: { instance: InstanceState }) => state.instance;
