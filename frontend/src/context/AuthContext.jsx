import { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const response = await api.post("/auth/login", {
        username,
        password,
      });

      if (response.data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("isAuthenticated", "true");
        return { success: true };
      }
      return { success: false, message: "Invalid credentials" };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem("isAuthenticated");
  };

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    if (authStatus === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const value = {
    isAuthenticated,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
