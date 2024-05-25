export function useAuthConnect() {
  return {
    firebaseAuthConnect: (initData: string) => {
      const tmpString =
        "OneMinute query_id=AAHWOmBqAAAAANY6YGqe3sSw&user=%7B%22id%22%3A1784691414%2C%22first_name%22%3A%22Shuta%22%2C%22last_name%22%3A%22Iwasaki%22%2C%22username%22%3A%22shoo5123%22%2C%22language_code%22%3A%22ja%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1716644843&hash=88c8a828344c45685c2ee9e3ce804748863b6924cf562b312fb530340cc90193";
      const tmpString2 =
        "query_id=AAHWOmBqAAAAANY6YGqe3sSw&user=%7B%22id%22%3A1784691414%2C%22first_name%22%3A%22Shuta%22%2C%22last_name%22%3A%22Iwasaki%22%2C%22username%22%3A%22shoo5123%22%2C%22language_code%22%3A%22ja%22%2C%22allows_write_to_pm%22%3Atrue%7D&auth_date=1716644843&hash=88c8a828344c45685c2ee9e3ce804748863b6924cf562b312fb530340cc90193";

      const decodedInitData = decodeURIComponent(tmpString2);
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

      // Step5:Firebase auth connect
          console.log(requestParam);
          
          
      return true;
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
