import { signInWithCustomToken } from "firebase/auth";
import { useFetchBE } from "@/app/hooks/infrastructure/useFetchBE";
import { useAuthInit } from "@/app/hooks/infrastructure/useAuthInit";
import { TELEGRAM_AUTH } from "@/app/const/endpoints";

export function useAuthConnect() {
  const { get } = useFetchBE();
  const { authInit } = useAuthInit();

  return {
    firebaseAuthConnect: async (initData: string) => {
      const auth = authInit();
      console.log("initData", initData);
      const decodedInitData = decodeURIComponent(initData);
      //console.log("decodedInitData", decodedInitData);

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
      const response = await get(TELEGRAM_AUTH, requestParam);

      // Step5:Firebase auth connect
      return await response.json().then(async (value) => {
        const customToken: string = String(value.customToken);
        // const isVerify = Boolean(value.isVerify); // TODO: isVerifyがfalseのときの制御
        console.log("customToken: ", customToken);
        return await signInWithCustomToken(auth, customToken)
          .then((userCredential) => {
            console.log("User logged in:", userCredential.user);
            return userCredential.user.uid;
          })
          .catch((error) => {
            console.error("Error signing in with custom token:", error);
            return "";
          });
      });
    },
  };
}
