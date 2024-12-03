import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../auth/Login";
import ProtectedRoute from "./ProtectedRoute";
import UserNavigator from "../user/UserNavigator";

const AppNavigator = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/user/*"
          element={
            <ProtectedRoute>
              <UserNavigator />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<div>404 - Page Not Found</div>} />
        <Route path="/test" element={<h1 style={{fontFamily:'DMB',justifyContent:"center",display:'flex'}}>TEST PAGE</h1>} />
      </Routes>
    </Router>
  );
};

export default AppNavigator;
