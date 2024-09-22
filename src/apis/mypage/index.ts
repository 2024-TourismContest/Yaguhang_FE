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
      const response = await defaultApi.get(
        `api/scraps/schedule?page=${page}&size=${size}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching MyScrap data:", error);
      throw error;
    }
  },

  MyBookMark: async (page:number, size: number, filter: string): Promise<MyBookMarkResponse> => {
    try {
      const response = await defaultApi.get<MyBookMarkResponse>(
        `api/scraps/spot/filter?pageIndex=${page}&pageSize=${size}&filter=${filter}`
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

  // 카카오 로그인 여부 확인
  CheckKakao: async (): Promise<string> => {
    try {
      const response = await defaultApi.get("/api/auth/provider");
      return response.data;
    } catch (error) {
      console.error("Error checking kakao auth:", error);
      throw error;
    }
  },

  // 비밀번호 확인
  CheckPassword: async (currentPassword: string): Promise<boolean> => {
    try {
      const response = await defaultApi.get(
        `/api/auth/password-check?password=${currentPassword}`
      );
      return response.data;
    } catch (error) {
      console.error("Error checking password:", error);
      throw error;
    }
  },

  // 비밀번호 변경
  ChangePassword: async (newPassword: string): Promise<void> => {
    try {
      const response = await defaultApi.put("/api/auth/password", {
        newPassword,
      });
      return response.data;
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  },
};
