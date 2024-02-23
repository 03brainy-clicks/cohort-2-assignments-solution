import { atom } from "recoil";

export const authState = new atom({
  key: "authState",
  default: { JWT: "", auth: false, userId: "" },
});
