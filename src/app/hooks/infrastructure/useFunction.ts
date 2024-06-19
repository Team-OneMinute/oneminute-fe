import { firebaseConfig } from "@/app/config/firebaseConfig";
import { useSelector } from "@/app/redux/store/stores";
import { initializeApp } from "firebase/app";
import {
  connectFunctionsEmulator,
  getFunctions,
  httpsCallable,
} from "firebase/functions";

export function useFunction() {
  const functions = useSelector((state) => state.firebase.firebaseFunctions);
  return {
    call: async (endPoint: string, body: Object) => {
      try {
        const callApi = httpsCallable(functions, endPoint);
        return await callApi(body);
      } catch (error) {
        throw error;
      }
    },
  };
}

// const firebaseFunctionInitialized = () => {
//   const app = initializeApp(firebaseConfig);
//   const functions = getFunctions(app);
//   if (process.env.NEXT_PUBLIC_BE_USE_SIMULATOR) {
//     connectFunctionsEmulator(functions, "127.0.0.1", 5001);
//   }
//   return functions;
// };
