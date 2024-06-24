import { createSlice } from "@reduxjs/toolkit";

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    userInfo: {
      uid: "",
    },
  },
  reducers: {
    setUid: (state, action) => {
      state.userInfo.uid = action.payload;
    },
  },
});

export const { setUid } = userInfoSlice.actions;

export default userInfoSlice.reducer;
