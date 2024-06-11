import { usePageNavigate } from "@/app/hooks/util/usePageNavigate";
import { START_MINI_GAME_BY_LIFE } from "@/app/const/endpoints";
import { useFunction } from "@/app/hooks/infrastructure/useFunction";
import { useScore } from "./useScore";
import { useGameTransaction } from "./useGameTransaction";

interface StartMiniGameResponse {
  success: boolean;
}

interface StartMiniGameSuccessResponse {
  result: string;
  gameTransactionId: string;
}

interface StartMiniGameFailedResponse {
  result: string;
  reason: string;
}

const castResponseData = (response: any): StartMiniGameResponse & (StartMiniGameSuccessResponse | StartMiniGameFailedResponse) => {
  const successResponseData = response.data as StartMiniGameSuccessResponse;
  const failedResponseData = response.data as StartMiniGameFailedResponse;

  if (successResponseData.gameTransactionId) {
    return {
      ...successResponseData,
      success: true,
    } as StartMiniGameResponse & StartMiniGameSuccessResponse;
  } else {
    return {
      ...failedResponseData,
      success: false,
    } as StartMiniGameResponse & StartMiniGameFailedResponse;
  }
}

export function useGameStart() {
  const { goto } = usePageNavigate();
  const { call } = useFunction();
  const { getScoreByFirestore } = useScore();
  const { setGameTransactionId } = useGameTransaction();

  return {
    startGame: async (uid: string, gameId: string) => {
      await call(START_MINI_GAME_BY_LIFE, {
        gameId,
      }).then(async (response) => {
        console.log("startMiniGameByLifeResponse", response);
        if (!response) {
          // TODO: add process, when failed to start game
          return;
        }
        const data = castResponseData(response);

        const score = await getScoreByFirestore(uid);
        console.log("score", score);

        if (data.success) {
          setGameTransactionId(
            (data as StartMiniGameSuccessResponse).gameTransactionId
          );
          goto("game");
        } else {
          setGameTransactionId("");
        }
      });
    },
  };
}
