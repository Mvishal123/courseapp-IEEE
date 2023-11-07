import { atom } from "recoil";

export const userSessionState = atom({
  key: "userSessionState",
  default: {
    userId: "",
    username: "",
  },
});
