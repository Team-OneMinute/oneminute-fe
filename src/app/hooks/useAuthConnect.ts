import { firebaseConfig } from "@/app/config/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import { useFetch } from "@/app/hooks/useFetch";

export function useAuthConnect() {
  const { get } = useFetch("stg");

  return {
    firebaseAuthConnect: async (initData: string) => {
      const auth = fireStoreInitialized();
      const decodedInitData = decodeURIComponent(initData);
      console.log("decodedInitData", decodedInitData);

      // Step 2: リクエストパラメータを配列に格納
      const paramsArray = decodedInitData.split("&").map((param) => {
        const [key, value] = param.split("=");
        return { key, value };
      });

      // Step 3: アルファベット順にソートしてクエリ文字列を構成
      const sortedParams = paramsArray.sort((a, b) =>
        a.key.localeCompare(b.key)
      );
      const requestParam = sortedParams
        .map((param) => `${param.key}=${param.value}`)
        .join("&");

      // STEP:4 Firebase functionで　hash検証
      const request_query = JSON.stringify({
        query: requestParam,
      });
      console.log("request_query", request_query);
      const response = await get("/telegramAuth", requestParam);

      // Step5:Firebase auth connect
      return await response.json().then(async (value) => {
        const token: string = String(value.token);
        console.log("customToken: ", token);
        return await signInWithCustomToken(auth, token)
          .then((userCredential) => {
            console.log("User logged in:", userCredential.user);
            return true;
          })
          .catch((error) => {
            console.error("Error signing in with custom token:", error);
            return false;
          });
      });
    },
  };
}

const fireStoreInitialized = () => {
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  return auth;
};
