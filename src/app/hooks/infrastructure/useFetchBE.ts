type envType = "dev" | "stg" | "prod";

export function useFetchBE(env: envType) {
  return {
    get: async (uri: string, params: string) => {
      const fetchUrl = getFetchUrl(env, uri);
      const requestUrl = `${fetchUrl}?${params}`;

      return await fetch(requestUrl, {
        method: "GET",
      });
    },
    post: async (uri: string, params: { [key: string]: string }) => {
      // TODO: post request
      const fetchUrl = getFetchUrl(env, uri);

      return await fetch(fetchUrl, {
        method: "POST",
        body: JSON.stringify(params),
      })
    },
  };
}

const getFetchUrl = (env: envType, uri: string) => {
  let endPoint = "";
  switch (env) {
    case "dev":
      endPoint = "http://127.0.0.1:5001/oneminute-88837/us-central1";
      break;
    case "stg":
      endPoint = "https://us-central1-oneminute-88837.cloudfunctions.net";
      break;
    case "prod":
      endPoint = "";
      break;
    default:
      endPoint = "";
  }

  return `${endPoint}${uri}`;
};
