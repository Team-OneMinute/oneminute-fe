import { createSlice } from "@reduxjs/toolkit";

export const scoreSlice = createSlice({
    name: "score",
    initialState: {
        score: 10,
    },
    reducers: {
        setScore: (state, action) => {
            state.score = action.payload;
        },
    },
});

export const { setScore } = scoreSlice.actions;

export default scoreSlice.reducer;
