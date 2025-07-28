import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const login = (token, user, name, profilePicture) => {
    localStorage.setItem("token", token);
    localStorage.setItem("loggedInUser", name);
    localStorage.setItem(
      "profilePicture",
      profilePicture ||
        "https://flowbite.com/docs/images/people/profile-picture-3.jpg"
    );
    setToken(token);
    setUser(user);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("profilePicture");
    setToken("");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          // Use the same API_BASE_URL as your ExpenseTracker for consistency
          const API_BASE_URL =
            process.env.REACT_APP_API_URL || "http://localhost:8080/api";
          const response = await axios.get(`${API_BASE_URL}/auth/verify`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          if (response.data.user) {
            setUser(response.data.user);
            setIsAuthenticated(true);
          } else {
            logout();
          }
        } catch (error) {
          console.error("Token verification failed:", error);
          // Only call logout if the error is due to an invalid/expired token (403 or 401)
          if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            logout();
          }
        }
      } else {
        logout();
      }
    };
    verifyToken();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;