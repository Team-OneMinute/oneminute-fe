import { useFirestore } from "../infrastructure/useFirestore";

export function useScore() {
  const { getDocumentByDocNo } = useFirestore();

  return {
    getScore: async (uid: string) => {
      return await getDocumentByDocNo("scores", uid).then((scoreData) => {
        if (!scoreData) {
          return;
        }
        return Number(scoreData.score);
      });
    },
  };
}
