import { recommendRequestType } from "../../types/recommendType";
import { defaultApi } from "../core/index";
const getAuthToken = () => localStorage.getItem("token") || "";
export const recommend = (params: recommendRequestType) => {
  const { pagdIndex, pageSize, order, filter } = params;
  try {
    const response = defaultApi.get("/api/recommend", {
      params: {
        pagdIndex,
        pageSize,
        order,
        filter,
      },
    });
    return response;
  } catch (error) {
    console.error("추천행리스트가져오기에러", error);
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
