export function useAuthConnect() {
  return {
    firebaseAuthConnect: async (initData: string) => {
      const decodedInitData = decodeURIComponent(initData);
      console.log(decodedInitData);

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
      return await response.json().then((value) => {
        return value;
      });

      // Step5:Firebase auth connect
          console.log(requestParam);
          
          
      // return true;
      //     firebase
      //       .auth()
      //       .signInWithCustomToken(token)
      //       .then((userCredential) => {
      //         console.log("User logged in:", userCredential.user);
      //         setUser(userCredential.user as User);
      //       })
      //       .catch((error) => {
      //         console.error("Error signing in with custom token:", error);
      //       });
      //   return state;
    },
  };
}
