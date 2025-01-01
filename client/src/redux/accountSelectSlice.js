import { createSlice } from "@reduxjs/toolkit";

const initialState = false

const accountSelectSlice = createSlice({
    name: "accountSelect",
    initialState,
    reducers: {
        account: (state, action) => {
            state = action.payload
            return state
        }
    },
});

export const { account } = accountSelectSlice.actions;

export default accountSelectSlice.reducer;