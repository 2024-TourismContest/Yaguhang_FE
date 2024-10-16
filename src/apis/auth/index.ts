import { defaultApi } from "../core/index";
import useAuthStore from "../../store/authStore";

export const auth = {
  login: async (email: string, password: string) => {
    try {
      const response = await defaultApi.post("/api/auth/login", {
        email,
        password,
      });
      const { accessToken, tokenType } = response.data;

      const setIsAuthenticated = useAuthStore.getState().setIsAuthenticated;
      setIsAuthenticated(true);

      localStorage.setItem("token", accessToken);
      localStorage.setItem("tokenType", tokenType);

      return response.data;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  signup: async (data: {
    email: string;
    password: string;
    nickname: string;
    profileImage?: string;
  }) => {
    try {
      const response = await defaultApi.post("/api/auth/signup", data);
      return response.data;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  },
  deleteAccount: async () => {
    try {
      const response = await defaultApi.delete("/api/users");
      return response.data;
    } catch (error) {
      console.error("Signup error:", error);
      throw error;
    }
  },
};
