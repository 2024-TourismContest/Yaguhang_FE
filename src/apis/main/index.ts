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
      console.error("카테고리별추천 에러", error);
      throw error;
    }
  },
};
