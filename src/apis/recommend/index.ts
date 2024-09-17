import {
  RecommendDetailResponse,
  recommendRequestType,
  RecommendResponse,
} from "../../types/recommendType";
import { defaultApi } from "../core/index";

const getAuthToken = () => localStorage.getItem("token") || "";

export const recommend = async (
  params: recommendRequestType
): Promise<RecommendResponse> => {
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
    return response.data;
  } catch (error) {
    console.error("추천 리스트 가져오기 에러", error);
    throw error;
  }
};

export const recommendDetail = async (
  recommendId: number
): Promise<RecommendDetailResponse> => {
  try {
    const response = await defaultApi.get("/api/recommend/detail", {
      params: {
        recommendId,
      },
    });
    return response.data;
  } catch (error) {
    console.error("추천 리스트 가져오기 에러", error);
    throw error;
  }
};

export const recommendBookmark = async (recommendId: number): Promise<any> => {
  const token = getAuthToken();
  try {
    const response = await defaultApi.patch(
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

export const recommendSearch = async (
  params: recommendRequestType & { keyWord: string }
): Promise<RecommendResponse> => {
  const { pagdIndex, pageSize, order, filter, keyWord } = params;

  try {
    const response = await defaultApi.get("/api/recommend/search", {
      params: {
        pagdIndex,
        pageSize,
        order,
        filter,
        keyWord,
      },
    });
    console.log("키워드", keyWord);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("추천 리스트 가져오기 에러", error);
    throw error;
  }
};
