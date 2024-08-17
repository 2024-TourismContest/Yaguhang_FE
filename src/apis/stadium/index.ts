import { defaultApi } from "../core/index";

interface CategoryQueryParams {
  stadiumId: number;
  category: string;
  pagesize?: number; // 선택적 파라미터
  pageindex?: number; // 선택적 파라미터
  radius?: number; // 선택적 파라미터
}

export const stadium = {
  Category: async (params: CategoryQueryParams) => {
    const { stadiumId, category, pagesize, pageindex, radius } = params;

    try {
      const response = await defaultApi.get("/api/stadium", {
        params: {
          stadiumId,
          category,
          pagesize,
          pageindex,
          radius,
        },
      });
      console.log(response);
      return response;
    } catch (error) {
      console.error("카테고리별추천 에러", error);
      throw error;
    }
  },
  playerPick: async (stadiumId: number) => {
    try {
      const response = await defaultApi.get(
        `/api/stadium/${stadiumId}/선수맛집`
      );
      console.log(response);
      return response;
    } catch (error) {
      console.error("선수픽맛집", error);
      throw error;
    }
  },
};
