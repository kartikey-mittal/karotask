import React from "react";
import { Routes, Route } from "react-router-dom";
import CreatorDashboard from "./pages/CreatorDashboard";

import CreatorSideMenu from "./components/CreatorSideMenu";

const CreatorNavigator = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div style={{ backgroundColor: "#f4f4f4", padding: "0px", height: "100%" }}>
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
