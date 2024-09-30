import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem("token"),
  setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenType");
    localStorage.removeItem("showFanTeamModalOnHome");
    set({ isAuthenticated: false }); 
    window.location.reload();
  },
}));

export default useAuthStore;
