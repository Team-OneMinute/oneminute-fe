import { firebaseConfig } from "@/app/config/firebaseConfig";
import { collection, addDoc, getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

export function useFirestore() {
  return {
    // TODO: トランザクション登録
    addDocument: async (collectionName: string, documentData: Object) => {
      try {
        const docRef = await addDoc(
          collection(fireStoreInitialized(), collectionName),
          documentData
        );
        return docRef.id;
      } catch (e) {
        throw e;
      }
    },
    // getDocument: (collectionName, query) => {
    //     const db = initialize();

    //     const scoreRef = collection(db, collectionName);
    //     const fetchScoreDescQuery = query(
    //         scoreRef,
    //         orderBy("score", "desc")
    //     );
    //     const scoreSnap = await getDocs(query);

    //     return scoreData = scoreSnap.docs.map((doc) => doc.data());
    // }
  };
}

const fireStoreInitialized = () => {
  const app = initializeApp(firebaseConfig);
  return getFirestore(app);
};
