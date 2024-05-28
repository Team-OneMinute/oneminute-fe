export function useEnv() {
  return {
    getEnv: () => {
      return process.env.REACT_APP_ENV;
    },
  };
}
