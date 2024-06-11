import { usePageNavigate } from "@/app/hooks/util/usePageNavigate";
import { START_MINI_GAME_BY_LIFE } from "@/app/const/endpoints";
import { useFunction } from "@/app/hooks/infrastructure/useFunction";
import { useScore } from "./useScore";

interface OnCallResponseData {
  result: string;
}

export function useGameStart() {
  const { goto } = usePageNavigate();
  const { call } = useFunction();
  const { getScoreByFirestore } = useScore();

  return {
    startGame: async (uid: string, gameId: string) => {
      await call(START_MINI_GAME_BY_LIFE, {
        gameId,
      }).then(async (response) => {
        console.log("startMiniGameByLifeResponse", response);
        const score = await getScoreByFirestore(uid);
        console.log("score", score);
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
