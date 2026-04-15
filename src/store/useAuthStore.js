import { create } from "zustand";
import { loginUser, registerUser } from "../api/authApi";
import useTaskStore from "./useTaskStore";
import useProjectStore from "./useProjectStore";

// Helper to decode user name from JWT token
const getUserNameFromToken = (token) => {
  if (!token) return null;
  try {
    const payload = JSON.parse(atob(token.split(".")[1]));
    return payload.name || payload.username || null;
  } catch (err) {
    return null;
  }
};

const storedToken = localStorage.getItem("token");
const storedUserName = localStorage.getItem("userName");

const useAuthStore = create((set) => ({
  token: storedToken || null,
  isAuthenticated: !!storedToken,
  userName: storedUserName || getUserNameFromToken(storedToken) || "User",

  login: async (data) => {
    const res = await loginUser(data);
    console.log("LOGIN RESPONSE:", res.data);

    const token = res.data.token;
    // Try to get name from response body, then from token
    let userName = res.data.data?.name || res.data.name || getUserNameFromToken(token);
    
    // If still no name, but we have a stored pending name (from registration), use that
    if (!userName || userName === "User") {
      userName = localStorage.getItem("pendingUserName") || "User";
    }

    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);
    localStorage.removeItem("pendingUserName"); // Clear pending name

    set({
      token: token,
      isAuthenticated: true,
      userName: userName,
    });
  },

  register: async (data) => {
    // Save the name locally in case the login response doesn't include it
    if (data.name) {
      localStorage.setItem("pendingUserName", data.name);
    }
    const res = await registerUser(data);
    return res;
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("pendingUserName");
     useTaskStore.getState().setTasks([]);
     useProjectStore.setState({ projects: [], selectedProject: null });

    set({
      token: null,
      isAuthenticated: false,
      userName: "User",
    });
  },
}));

export default useAuthStore;