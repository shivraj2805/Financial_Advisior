import React, { createContext, useState, useEffect } from "react";
import { useAuth } from "@clerk/clerk-react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { isSignedIn, isLoaded, user } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isLoaded) {
      setIsAuthenticated(isSignedIn);
      if (isSignedIn && user) {
        setUserData({
          id: user.id,
          email: user.emailAddresses?.[0]?.emailAddress,
          name: user.fullName || user.firstName || user.emailAddresses?.[0]?.emailAddress,
          profilePicture: user.imageUrl
        });
      } else {
        setUserData(null);
      }
    }
  }, [isLoaded, isSignedIn, user]);

  const login = (token, user, name, profilePicture) => {
    // This function is kept for compatibility but Clerk handles login
    console.log("Login handled by Clerk");
  };

  const logout = () => {
    // Clerk handles logout automatically
    console.log("Logout handled by Clerk");
  };

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated, 
      user: userData, 
      login, 
      logout,
      isLoaded 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
