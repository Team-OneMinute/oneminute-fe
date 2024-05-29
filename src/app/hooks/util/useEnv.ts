export function useEnv() {
  return {
    getEnv: () => {
      return process.env.NEXT_PUBLIC_ENV;
    },
  };
}
