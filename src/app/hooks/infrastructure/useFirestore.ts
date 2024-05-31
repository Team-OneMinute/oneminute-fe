import { firebaseConfig } from "@/app/config/firebaseConfig";
import { collection, addDoc, getFirestore, QueryFieldFilterConstraint, where, WhereFilterOp, query, getDocs } from "firebase/firestore";
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
    getDocument: async (collectionName: string, queries: string[]) => {
      const collectionRef = collection(fireStoreInitialized(), collectionName);
      const firestoreQueries: QueryFieldFilterConstraint[] = queries.map((query) => {
        const splitQueries = query.split(" ");
        return where(
          splitQueries[0],
          splitQueries[1] as WhereFilterOp,
          splitQueries[2]
        );
      });
      const firestoreQuery = query(collectionRef, ...firestoreQueries);
      const docSnap = await getDocs(firestoreQuery);
      return docSnap.docs.map((doc) => doc.data());
    }
  };
}

const fireStoreInitialized = () => {
  const app = initializeApp(firebaseConfig);
  return getFirestore(app);
};
