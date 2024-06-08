import { firebaseConfig } from "@/app/config/firebaseConfig";
import { initializeApp } from "firebase/app";
import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable,
} from "firebase/functions";

export function useFunction() {
  return {
    call: async (endPoint: string, body: Object) => {
      try {
        const callApi = httpsCallable(firebaseFunctionInitialized(), endPoint);
        return await callApi(body);
      } catch (error) {
        throw error;
      }
    },
  };
}

const firebaseFunctionInitialized = () => {
  const app = initializeApp(firebaseConfig);
  const functions = getFunctions(app);
  if (process.env.NEXT_PUBLIC_BE_USE_SIMULATOR) {
    connectFunctionsEmulator(functions, "127.0.0.1", 5001);
  }
  return functions;
};
