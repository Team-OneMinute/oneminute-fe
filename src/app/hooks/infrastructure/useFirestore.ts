import { firebaseConfig } from "@/app/config/firebaseConfig";
import {
  collection,
  addDoc,
  getFirestore,
  QueryFieldFilterConstraint,
  where,
  WhereFilterOp,
  query,
  getDocs,
  doc,
  getDoc,
  connectFirestoreEmulator,
} from "firebase/firestore";
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
      const firestoreQueries: QueryFieldFilterConstraint[] = queries.map(
        (query) => {
          const splitQueries = query.split(" ");
          return where(
            splitQueries[0],
            splitQueries[1] as WhereFilterOp,
            splitQueries[2]
          );
        }
      );
      const firestoreQuery = query(collectionRef, ...firestoreQueries);
      const docSnap = await getDocs(firestoreQuery);
      return docSnap.docs.map((doc) => doc.data());
    },
    getDocumentByDocNo: async (collectionName: string, docNo: string) => {
      const docRef = doc(fireStoreInitialized(), collectionName, docNo);
      const docData = await getDoc(docRef).then((docSnap) => {
        return docSnap.data();
      });
      console.log("docData", docData);
      return docData;
    },
  };
}

const fireStoreInitialized = () => {
  // TODO: save app to context on redux
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  if (process.env.NEXT_PUBLIC_BE_USE_SIMULATOR) {
    connectFirestoreEmulator(db, "127.0.0.1", 8080);
  }
  return db;
};
