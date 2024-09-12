import { recommendRequestType } from "../../types/recommendType";
import { defaultApi } from "../core/index";
const getAuthToken = () => localStorage.getItem("token") || "";
export const recommend = async (params: recommendRequestType) => {
  const { pagdIndex, pageSize, order, filter } = params;

  try {
    const response = await defaultApi.get("/api/recommend", {
      params: {
        pagdIndex,
        pageSize,
        order,
        filter,
      },
    });
    return response;
  } catch (error) {
    console.error("추천 리스트 가져오기 에러", error);
    throw error;
  }
};

export const recommendBookmark = (recommendId: number) => {
  const token = getAuthToken();
  try {
    const response = defaultApi.patch(
      `/api/recommend/like?recommendId=${recommendId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          accept: "*/*",
        },
      }
    );
    return response;
  } catch (error) {
    console.error("추천행 좋아요", error);
    throw error;
  }
};
