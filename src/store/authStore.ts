import {create} from 'zustand';

interface AuthState {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
}
const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: !!localStorage.getItem("token"),
  setIsAuthenticated: (value: boolean) => set({ isAuthenticated: value }),
}));

export default useAuthStore;