import { INITIALIZE_USER_DATA } from "@/app/const/endpoints";
import { useFetchBE } from "@/app/hooks/infrastructure/useFetchBE";
import { useFirestore } from "@/app/hooks/infrastructure/useFirestore";

export function useUserInitialize() {
  const { post } = useFetchBE();
  const { getDocumentByDocNo } = useFirestore();

  return {
    userInitialize: async (uid: string) => {
      // get "users" collection data by uid
      const userData = await getDocumentByDocNo("users", uid);
      console.log("userData", userData);
      if (userData != undefined) {
        console.log("userData is exists.");
        return;
      }
      const params = {
        uid: uid,
      };
      await post(INITIALIZE_USER_DATA, params).then((response) => {
        console.log(response);
      });
    },
  };
}
