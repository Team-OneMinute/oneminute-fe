import { useSelector } from "@/app/redux/store/stores";
import { useFirestore } from "@/app/hooks/infrastructure/useFirestore";
import { useDispatch } from "react-redux";
import { setGameInfo } from "@/app/redux/store/slices/gameInfoSlice";

export function useGameInfo() {
  const { getDocument } = useFirestore();
  const gameInfoListByStore = useSelector((state) => state.gameInfo.gameInfo);
  const dispatch = useDispatch();

  return {
    getGameInfo: async () => {
      if (gameInfoListByStore.length > 0) {
        return gameInfoListByStore;
      }
      const gameInfoListByFirestore = await getDocument("games", []);
      const gameInfoList = gameInfoListByFirestore.map((gameInfo) => {
        return {
          gameId: gameInfo.id,
          description: gameInfo.data.description,
        };
      });
      dispatch(setGameInfo(gameInfoList));

      return gameInfoList;
      },
      getGameInfoByStore: () => {
        return gameInfoListByStore;
      }
  };
}
