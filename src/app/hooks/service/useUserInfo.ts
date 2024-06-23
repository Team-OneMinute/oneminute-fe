import { useSelector } from "@/app/redux/store/stores";
import { useDispatch } from "react-redux";
import { setUid } from "@/app/redux/store/slices/userInfoSlice";

export function useUserInfo() {
  const userInfo = useSelector((state) => state.userInfo.userInfo);
  const dispatch = useDispatch();

  return {
    uid: userInfo.uid,
    setUid: (uid: string) => {
      dispatch(setUid(uid));
    },
  };
}
