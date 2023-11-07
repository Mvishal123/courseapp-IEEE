import { useSession } from "next-auth/react";
import { userSessionState } from "@/store/atoms/state"
import { useSetRecoilState } from "recoil";

const SessionSeeder = () => {
const setSessionState = useSetRecoilState(userSessionState);
const { data: session  } = useSession()
}

export default SessionSeeder