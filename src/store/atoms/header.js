import { atom } from "recoil";

export const HeaderState = atom({
    key: "HeaderState",
    default: {
        type: "",
        loading: true
    }
})