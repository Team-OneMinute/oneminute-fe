import { firebaseConfig } from "@/app/config/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

export function useAuthInit() {
  return {
    authInit: () => {
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      return auth;
    }
  }
}
