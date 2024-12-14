import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import UserAccount from "./pages/UserAccount";
import UserSideMenu from "./components/UserSideMenu"

const UserNavigator = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div style={{  }}>
        <UserSideMenu />
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, padding: "0px", backgroundColor: "#fff" }}>
        <Routes>
          <Route path="dashboard/*" element={<Dashboard />} />
          <Route path="account" element={<UserAccount />} />
          <Route path="*" element={<div>User Section 404 - Page Not Found</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default UserNavigator;
