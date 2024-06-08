import { firebaseConfig } from "@/app/config/firebaseConfig";
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";

export function useAuthInit() {
  return {
    authInit: () => {
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      if (process.env.NEXT_PUBLIC_BE_USE_SIMULATOR) {
        connectAuthEmulator(auth, "http://127.0.0.1:9099");
      }
      return auth;
    },
  };
}
