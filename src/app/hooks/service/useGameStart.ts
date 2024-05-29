import { useAuthInit } from "@/app/hooks/infrastructure/useAuthInit";
import { useFirestore } from "@/app/hooks/infrastructure/useFirestore";
import { useDateFormatter } from "@/app/hooks/util/useDateFormatter";
import { usePageNavigate } from "@/app/hooks/util/usePageNavigate";

export function useGameStart() {
  const { authInit } = useAuthInit();
  const { addDocument } = useFirestore();
  const { dateFormat } = useDateFormatter();
  const { goto } = usePageNavigate();

  return {
    startGame: () => {
      const auth = authInit();

      // TODO: move use hooks
      if (!auth) return;
      if (auth.currentUser == null) return;

      let uid;
      auth.currentUser
        .getIdToken(true)
        .then(function (idToken) {
          console.log(idToken);
          uid = idToken;
        })
        .catch(function (error) {
          throw new Error("get firebase auth id token failed", error);
        });

      // step: set transaction
      const collectionName = "0001_transaction";
      const documentData = {
        uid: uid,
        created_at: dateFormat(new Date()),
      };
      addDocument(collectionName, documentData).then(function (result) {
        if (result) {
          goto("game");
        }
      });
    },
  };
}
