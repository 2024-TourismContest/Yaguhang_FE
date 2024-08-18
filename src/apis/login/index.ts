import { defaultApi } from "../core/index";

export const login = {
  login: async (email: string, password: string) => {
    try {
      const response = await defaultApi.post("/api/auth/login", { email, password });
      const { accessToken, tokenType } = response.data;
      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem("token", accessToken);
      localStorage.setItem("tokenType", tokenType);
      return response.data; 
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },
};
