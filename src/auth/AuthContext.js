import React, { createContext, useState, useEffect } from "react";

// Create the context
export const AuthContext = createContext();

// AuthProvider component
const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  // Load the token from localStorage when the app starts
  useEffect(() => {
    const savedToken = localStorage.getItem("authToken");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Save the token to localStorage on login
  const login = (newToken) => {
    localStorage.setItem("authToken", newToken);
    setToken(newToken);
  };

  // Clear the token from localStorage on logout
  const logout = () => {
    localStorage.removeItem("authToken");
    setToken(null);
  };

  // Context value to be provided to children
  const contextValue = {
    token,
    login,
    logout,
  };

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
