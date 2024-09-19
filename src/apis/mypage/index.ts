import {
  MyPageInfo,
  MyReviewResponse,
  ScrapsScheduleResponse,
  MyRecommendResponse,
  MyBookMarkResponse,
} from "../../types/myPageType";
import { defaultApi } from "../core/index";

export const mypage = {
  MyRecommend: async (pageSize: number): Promise<MyRecommendResponse> => {
    try {
      const response = await defaultApi.get("/api/recommend/myrecommend", {
        params: { pageSize },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching MyRecommend data:", error);
      throw error;
    }
  },

  MyReview: async (): Promise<MyReviewResponse> => {
    try {
      const response = await defaultApi.get("/api/review/my-review");
      return response.data;
    } catch (error) {
      console.error("Error fetching MyReview data:", error);
      throw error;
    }
  },

  MyScrap: async (
    page: number,
    size: number
  ): Promise<ScrapsScheduleResponse> => {
    try {
      const response = await defaultApi.get("/api/scraps/schedule", {
        params: { page, size },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching MyScrap data:", error);
      throw error;
    }
  },

  MyBookMark: async (): Promise<MyBookMarkResponse> => {
    try {
      const response = await defaultApi.get<MyBookMarkResponse>(
        "/api/scraps/spot"
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching MyBookMark data:", error);
      throw error;
    }
  },

  MyPageInfo: async (): Promise<MyPageInfo> => {
    try {
      const response = await defaultApi.get("/api/mypage/info");
      return response.data;
    } catch (error) {
      console.error("Error fetching MyPageInfo data:", error);
      throw error;
    }
  },

  RegistFan: async (team: string) => {
    try {
      const response = await defaultApi.post(`/api/users/fan/${team}`);
      return response.data;
    } catch (error) {
      console.error("Error registering fan team:", error);
      throw error;
    }
  },

  EditProfile: async (nickname: string, profileImage: string) => {
    console.log("사진::",profileImage)
    try {
      const response = await defaultApi.put("/api/users", {
        nickname,
        profileImge: profileImage,
      });
      return response.data;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  },
};
