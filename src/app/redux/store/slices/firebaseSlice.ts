import { firebaseConfig } from "@/app/config/firebaseConfig";
import { createSlice } from "@reduxjs/toolkit";
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";

const firebaseInitialized = (() => {
  const app = initializeApp(firebaseConfig);
  const firebaseAuth = getAuth(app);
  const firestore = getFirestore(app);
  const firebaseFunctions = getFunctions(app);

  if (process.env.NEXT_PUBLIC_BE_USE_SIMULATOR) {
    const simulatorUrl = "127.0.0.1";
    connectAuthEmulator(firebaseAuth, `http://${simulatorUrl}:9099`);
    connectFirestoreEmulator(firestore, simulatorUrl, 8080);
    connectFunctionsEmulator(firebaseFunctions, "127.0.0.1", 5001);
  }

  return { firebaseAuth, firestore, firebaseFunctions };
})();

export const firebaseSlice = createSlice({
  name: "firebase",
  initialState: {
    firebaseAuth: firebaseInitialized.firebaseAuth,
    firestore: firebaseInitialized.firestore,
    firebaseFunctions: firebaseInitialized.firebaseFunctions,
  },
  reducers: {},
});

export default firebaseSlice.reducer;
