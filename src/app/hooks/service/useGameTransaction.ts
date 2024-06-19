import { useSelector } from "@/app/redux/store/stores";
import { useDispatch } from "react-redux";
import { setGameTransaction } from "@/app/redux/store/slices/gameTransactionSlice";

export function useGameTransaction() {
  const gameTransactionId = useSelector((state) => state.gameTransaction.id);
  const dispatch = useDispatch();

  return {
    getGameTransactionId: () => {
      return gameTransactionId;
    },
    setGameTransactionId: (gameTransactionId: string) => {
      dispatch(setGameTransaction(gameTransactionId));
    },
  };
}
