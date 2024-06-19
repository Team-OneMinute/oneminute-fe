import { createSlice } from "@reduxjs/toolkit";

export const gameTransactionSlice = createSlice({
  name: "gameTransaction",
  initialState: {
    id: "",
  },
  reducers: {
    setGameTransaction: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { setGameTransaction } = gameTransactionSlice.actions;

export default gameTransactionSlice.reducer;
