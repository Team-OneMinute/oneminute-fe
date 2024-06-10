import { usePageNavigate } from "@/app/hooks/util/usePageNavigate";
import { FINISH_MINI_GAME } from "@/app/const/endpoints";
import { useFunction } from "@/app/hooks/infrastructure/useFunction";

interface FinishMiniGameResponse {
  success: boolean;
}

interface FinishMiniGameSuccessResponse {
  resultCode: string;
  beforeRanking: string;
  afterRanking: string;
}

interface FinishMiniGameFailedResponse {
  result: string;
  reason: string;
  message: string;
}

const castResponseData = (response: any): FinishMiniGameResponse & (FinishMiniGameSuccessResponse | FinishMiniGameFailedResponse) => {
  const successResponseData = response.data as FinishMiniGameSuccessResponse;
  const failedResponseData = response.data as FinishMiniGameFailedResponse;

  if (successResponseData.resultCode) {
    return {
      ...successResponseData,
      success: true,
    } as FinishMiniGameResponse & FinishMiniGameSuccessResponse;
  } else {
    return {
      ...failedResponseData,
      success: false,
    } as FinishMiniGameResponse & FinishMiniGameFailedResponse;
  }
}

export function useGameFinish() {
  const { call } = useFunction();

  const gameTransactionId = "00001999999999920240610000000"; // dummy transactionId

  return {
    finishGame: async (gameId: string, score: number) => {
      console.log("start finishGame");
      console.log("gameId", gameId);
      console.log("score", score);
      return await call(FINISH_MINI_GAME, {
        gameId: gameId,
        gameTransactionId: gameTransactionId,
        // score: score, // TODO: maybe exist
      }).then((response) => {
        console.log("finishMiniGameResponse", response);
        if (!response) {
          // TODO: add process, when failed to finish game
          return "response is undefined";
        }
        const data = castResponseData(response);
        if (data.success) {
          return (data as FinishMiniGameResponse & FinishMiniGameSuccessResponse).resultCode;
        } else {
          return (data as FinishMiniGameResponse & FinishMiniGameFailedResponse).result;
        }
      });
    },
  };
}
