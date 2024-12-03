import React from "react";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  // Redirect to login if not authenticated
  // return token ? children : <Navigate to="/login" />;
  return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
