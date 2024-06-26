export function useFetchBE() {
  return {
    get: async (endPoint: string, params: string) => {
      const fetchUrl = getFetchUrl(endPoint);
      const requestUrl = `${fetchUrl}?${params}`;

      return await fetch(requestUrl, {
        method: "GET",
      });
    },
    post: async (endPoint: string, params: { [key: string]: string }) => {
      // TODO: post request
      const fetchUrl = getFetchUrl(endPoint);

      return await fetch(fetchUrl, {
        method: "POST",
        body: JSON.stringify(params),
      });
    },
  };
}

const getFetchUrl = (endPoint: string) => {
  if (process.env.NEXT_PUBLIC_BE_USE_SIMULATOR) {
    return `${process.env.NEXT_PUBLIC_BE_SIMULATOR_URL}/${endPoint}`;
  }
  return `${process.env.NEXT_PUBLIC_BE_URL}/${endPoint}`;
};
