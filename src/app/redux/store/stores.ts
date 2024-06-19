import { configureStore } from "@reduxjs/toolkit";
import {
  useSelector as rawUseSelector,
  TypedUseSelectorHook,
} from "react-redux";
import gameTransactionReducer from "./slices/gameTransactionSlice";
import scoreReducer from "./slices/scoreSlice";
import firebaseReducer from "./slices/firebaseSlice";

export const stores = configureStore({
  reducer: {
    firebase: firebaseReducer,
    gameTransaction: gameTransactionReducer,
    score: scoreReducer,
  },
});

export type RootState = ReturnType<typeof stores.getState>;
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector;