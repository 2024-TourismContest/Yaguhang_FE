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
  const { pageIndex, pageSize, order, filter } = params;
  console.log(pageIndex);
  try {
    const response = await defaultApi.get("/api/recommend", {
      params: {
        pageIndex,
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
    return response.data;
  } catch (error) {
    console.error("추천행 좋아요", error);
    throw error;
  }
};

export const recommendSearch = async (
  params: recommendRequestType & { keyWord: string }
): Promise<RecommendResponse> => {
  const { pageIndex, pageSize, order, filter, keyWord } = params;

  try {
    const response = await defaultApi.get("/api/recommend/search", {
      params: {
        pageIndex,
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

// 추천행 생성 함수
export const createCourse = async (
  stadium: string,
  title: string,
  description: string,
  contentIdList: number[]
): Promise<any> => {
  const token = getAuthToken();
  try {
    const response = await defaultApi.post(
      "/api/recommend",
      {
        Stadium: stadium,
        title: title,
        description: description,
        contentIdList: contentIdList,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error 마이 코스 생성:", error);
    throw error;
  }
};

export const fetchScrapData = async (stadiumName: string): Promise<any> => {
  const token = getAuthToken();
  try {
    const response = await defaultApi.get("/api/recommend/myscrap", {
      params: {
        stadiumName,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "*/*",
      },
    });
    return response.data;
  } catch (error) {
    console.error("스크랩 리스트 가져오기 에러", error);
    throw error;
  }
};
