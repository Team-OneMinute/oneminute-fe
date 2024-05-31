import { INITIALIZE_USER_DATA } from "@/app/const/endpoints";
import { useFetch } from "@/app/hooks/infrastructure/useFetch";
import { useFirestore } from "@/app/hooks/infrastructure/useFirestore";

export function useUserInitialize() {
  const { post } = useFetch("stg");
  const { getDocument } = useFirestore();

  return {
    userInitialize: async (uid: string) => {
      // get "users" collection data by uid
      const userData = await getDocument("users", [`uid == ${uid}`]);
      console.log("userData", userData);
      if (userData.length > 0) {
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
