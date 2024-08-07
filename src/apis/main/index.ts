import { defaultApi } from "../core/index";
export const home = {
  place: async (stadium: string, category: string) => {
    try {
      const response = await defaultApi.get(
        `/api/main/place/${stadium}/${category}`
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error("Error fetching profile:", error);
      console.log(stadium, category);
      throw error;
    }
  },
};
