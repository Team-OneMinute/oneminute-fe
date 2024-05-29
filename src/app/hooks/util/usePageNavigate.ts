"use client";
import { configParseGasLimitsPrices } from "@ton/ton";
import { useRouter } from "next/navigation";

export function usePageNavigate() {
  const router = useRouter();
  return {
    goto: (pageName: string) => {
      switch (pageName) {
        case "game":
          router.push("/game");
          break;
        case "login":
          router.push("/login");
          break;
        default:
          router.push("/");
      }
    },
  };
}
