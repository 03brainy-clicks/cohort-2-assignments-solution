import { authState } from "../atoms/AuthAtom";
import axios from "axios";
import { selector } from "recoil";

export const userDetailState = selector({
  key: "userDetailState",
  get: async ({ get }) => {
    try {
      const auth = get(authState);
      if (auth.auth) {
        const response = await axios.get(
          "https://paytm-clone-backend-production.up.railway.app/api/users/65cb08287f8a989094b9af39",
          {
            headers: {
              Authorization: auth.JWT,
            },
          }
        );

        return response.data;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
      throw error;
    }
  },
});
