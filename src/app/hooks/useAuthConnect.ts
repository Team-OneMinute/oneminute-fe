import { firebaseConfig } from "@/app/config/firebaseConfig";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithCustomToken } from "firebase/auth";
import * as dotenv from "dotenv";
dotenv.config();

export type configInterface = {
  apiKey: string | undefined;
  authDomain: string | undefined;
  projectId: string | undefined;
  storageBucket: string | undefined;
  messagingSenderId: string | undefined;
  appId: string | undefined;
  measurementId: string | undefined;
};

export function useAuthConnect() {
  return {
    firebaseAuthConnect: async (
      initData: string,
      setCustomToken: (customToken: string) => void,
      setUserData: (userData: string) => void,
      setEnvConfig: (config: configInterface) => void
    ) => {
      const auth = fireStoreInitialized(setEnvConfig);
      const decodedInitData = decodeURIComponent(initData);
      console.log("decodedInitData", decodedInitData);

      // Step 2: リクエストパラメータを配列に格納
      const paramsArray = decodedInitData.split("&").map((param) => {
        const [key, value] = param.split("=");
        if (key == "user") {
          setUserData(value != "" ? value : "blankData");
        }
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
        query: initData,
      });
      console.log("request_query", request_query);
      // const environment = "local"; // local確認
      const response = await fetch(
        `https://us-central1-oneminute-88837.cloudfunctions.net/telegramAuth?${initData}`, // stgにデプロイ時にコメントアウトを外す
        // `https://us-central1-oneminute-88837.cloudfunctions.net/telegramAuth?${initData}&env=${environment}`, // local確認
        // `http://127.0.0.1:5001/oneminute-88837/us-central1/telegramAuth?${initData}&env=${environment}`, // local確認
        {
          method: "GET",
        }
      );

      // Step5:Firebase auth connect
      return await response.json().then(async (value) => {
        const token: string = String(value.token);
        console.log("customTokenType: ", typeof token);
        console.log("customToken: ", token);
        setCustomToken(token);
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

const fireStoreInitialized = (
  setEnvConfig: (config: configInterface) => void
) => {
  console.log("firebaseConfig", firebaseConfig);
  setEnvConfig(firebaseConfig);
  console.log("processEnv", process.env.REACT_APP_FIREBASE_APIKEY);
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  return auth;
};
