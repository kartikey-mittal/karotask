import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";

import AdminSideMenu from "./components/AdminSideMenu";

const AdminNavigator = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div style={{ backgroundColor: "#f4f4f4", padding: "0px", height: "100%" }}>
        <AdminSideMenu />
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, padding: "0px", backgroundColor: "#fff" }}>
        <Routes>
          <Route path="dashboard/*" element={<AdminDashboard />} />
          {/* <Route path="account" element={<UserAccount />} /> */}
          <Route path="*" element={<div>ADMIN Section 404 - Page Not Found</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminNavigator;
