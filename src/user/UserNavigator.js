import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

const UserNavigator = () => {
  return (
    <Routes>
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="*" element={<div>User Section 404 - Page Not Found</div>} />
    </Routes>
  );
};

export default UserNavigator;