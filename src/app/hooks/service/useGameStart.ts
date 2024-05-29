import { useAuthInit } from "@/app/hooks/infrastructure/useAuthInit";
import { useFirestore } from "@/app/hooks/infrastructure/useFirestore";
import { useDateFormatter } from "@/app/hooks/util/useDateFormatter";
import { usePageNavigate } from "@/app/hooks/util/usePageNavigate";
import { serverTimestamp } from "firebase/firestore";


export function useGameStart() {
  const { authInit } = useAuthInit();
  const { addDocument } = useFirestore();
  const { dateFormat } = useDateFormatter();
  const { goto } = usePageNavigate();

  return {
    startGame: () => {
      const auth = authInit();
      if (!auth) return;
      if (auth.currentUser == null) return;
      const uid = auth.currentUser.uid;

      // step: set transaction
      const collectionName = "0001_transaction";
      const documentData = {
        uid: uid,
        created_at: serverTimestamp(),
        cheat_check_flag: 0,
        bet_flg: 0,
      };
      addDocument(collectionName, documentData).then(function (result) {
        if (result) {
          goto("game");
        }
      });
    },
  };
}
