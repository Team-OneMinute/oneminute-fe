import { useEffect, useRef } from "react";

export function useCustomEffect<T>(func: () => T) {
  const didLogRef = useRef<boolean>(false);
  useEffect(() => {
    if (didLogRef.current === false) {
      didLogRef.current = true;
      (async () => {
        if (process.env.NEXT_PUBLIC_ENV != "prod") {
          const eruda = await import("eruda");
          eruda.default.init();
        }
      })();
      func();
    }
  }, []);
}
