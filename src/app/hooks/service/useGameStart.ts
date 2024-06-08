import { usePageNavigate } from "@/app/hooks/util/usePageNavigate";
import { START_MINI_GAME_BY_LIFE } from "@/app/const/endpoints";
import { useFunction } from "@/app/hooks/infrastructure/useFunction";

interface OnCallResponseData {
  result: string;
}

export function useGameStart() {
  const { goto } = usePageNavigate();
  const { call } = useFunction();

  return {
    startGame: async (gameId: string) => {
      await call(START_MINI_GAME_BY_LIFE, {
        gameId,
      }).then((response) => {
        console.log("startMiniGameByLifeResponse", response);
        if (!response) {
          // TODO: add process, when failed to start game
          return;
        }
        const data = response.data as OnCallResponseData;
        if (data.result == "success") {
          goto("game");
        }
      });
    },
  };
}
