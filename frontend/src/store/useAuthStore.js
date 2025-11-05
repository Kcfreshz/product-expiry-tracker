import { create } from "zustand";
import { setAuthToken } from "../api/axiosInstance";

const useAuthStore = create((set) => ({
  user: null,
  loading: true,

  setCredentials: (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token); // 👈 Add this
    setAuthToken(userData.token);
    set({ user: userData, loading: false });
  },

  logout: () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); // 👈 Add this too
    setAuthToken(null);
    set({ user: null, loading: false });
  },

  initializeAuth: () => {
    const saved = localStorage.getItem("user");
    if (saved) {
      const parsed = JSON.parse(saved);
      setAuthToken(parsed.token);
      set({ user: parsed, loading: false });
    } else {
      set({ user: null, loading: false });
    }
  },
}));

export default useAuthStore;
