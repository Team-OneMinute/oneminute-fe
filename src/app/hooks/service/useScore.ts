import { useSelector } from "@/app/redux/store/stores";
import { setScore } from "@/app/redux/store/slices/scoreSlice";
import { useFirestore } from "@/app/hooks/infrastructure/useFirestore";
import { useDispatch } from "react-redux";

export function useScore() {
  const { getDocumentByDocNo } = useFirestore();
  const scoreByStore = useSelector((state) => state.score.score);
  const dispatch = useDispatch();

  return {
    getScoreByFirestore: async (uid: string) => {
      return await getDocumentByDocNo("score", uid).then((scoreData) => {
        if (!scoreData) {
          return;
        }
        const score: number = scoreData.score;
        dispatch(setScore(score));

        return score;
      });
    },
    getScoreByStore: () => {
      return scoreByStore;
    },
  };
}
