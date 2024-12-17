import React from "react";
import { Routes, Route } from "react-router-dom";
import CreatorDashboard from "./pages/CreatorDashboard";

import CreatorSideMenu from "./components/CreatorSideMenu";

const CreatorNavigator = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
    <div
        style={{
          backgroundColor: "#f4f4f4", // Sidebar background
          overflow: "hidden", // Prevents sidebar content overflow
          boxShadow: "2px 0 5px rgba(0,0,0,0.1)", // Optional shadow for styling
        }}
      >
        <CreatorSideMenu />
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, padding: "0px", backgroundColor: "#fff" }}>
        <Routes>
          <Route path="dashboard/*" element={<CreatorDashboard />} />
          {/* <Route path="account" element={<UserAccount />} /> */}
          <Route path="*" element={<div>User Section 404 - Page Not Found</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default CreatorNavigator;
