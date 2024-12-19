import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "../auth/Login";
import AdminLogin from "../auth/AdminLogin"; // Import the AdminLogin component
import ProtectedRoute from "./ProtectedRoute";
import UserNavigator from "../user/UserNavigator";
import CreatorNavigator from "../creator/CreatorNavigator";
import AdminNavigator from "../admin/AdminNavigator";

const AppNavigator = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
<Route path="/admin/login" element={<AdminLogin />} /> // Route for Admin Login
<Route path="/login" element={<Login />} />
        <Route
          path="/user/*"
          element={
            // <ProtectedRoute>
              <UserNavigator />
            // </ProtectedRoute>
          }
        />
         <Route
          path="/creator/*"
          element={
            // <ProtectedRoute>
              <CreatorNavigator />
            // </ProtectedRoute>
          }
        />
         <Route
          path="/admin/*"
          element={
            // <ProtectedRoute>
              <AdminNavigator />
            // </ProtectedRoute>
          }
        />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
        <Route path="/test" element={<h1 style={{fontFamily:'DMB',justifyContent:"center",display:'flex'}}>TEST PAGE</h1>} />
      </Routes>
    </Router>
  );
};

export default AppNavigator;
