import { createSlice } from "@reduxjs/toolkit";

export const gameInfoSlice = createSlice({
  name: "gameInfo",
  initialState: {
      gameInfo: [] as { gameId: string, description: string }[], // TODO: to interface
  },
  reducers: {
    setGameInfo: (state, action) => {
      state.gameInfo = action.payload;
    },
  },
});

export const { setGameInfo } = gameInfoSlice.actions;

export default gameInfoSlice.reducer;
