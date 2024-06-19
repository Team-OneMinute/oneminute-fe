import { useSelector } from "@/app/redux/store/stores";
import {
  collection,
  addDoc,
  QueryFieldFilterConstraint,
  where,
  WhereFilterOp,
  query,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";

export function useFirestore() {
  const firestore = useSelector((state) => state.firebase.firestore);
  return {
    // TODO: トランザクション登録
    addDocument: async (collectionName: string, documentData: Object) => {
      try {
        const docRef = await addDoc(
          collection(firestore, collectionName),
          documentData
        );
        return docRef.id;
      } catch (e) {
        throw e;
      }
    },
    getDocument: async (collectionName: string, queries: string[]) => {
      const collectionRef = collection(firestore, collectionName);
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
      const docRef = doc(firestore, collectionName, docNo);
      const docData = await getDoc(docRef).then((docSnap) => {
        return docSnap.data();
      });
      console.log("docData", docData);
      return docData;
    },
  };
}
