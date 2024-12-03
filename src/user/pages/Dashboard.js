import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Earning from "./Earning";
import Task from "./Task";
import UserSideMenu from "../components/UserSideMenu";
import DashUI from "./DashUI";
import Test from "./Test";

const Dashboard = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <div style={{ backgroundColor: "#f4f4f4", padding: "0px", height: "100%" }}>
        
        <UserSideMenu/>
      </div>

      {/* Content Area */}
      <div style={{ flex: 1, padding: "0px",backgroundColor:"#fff" }}>
        <Routes>
          <Route path="Earning" element={<Earning />} />
          <Route path="task" element={<Task />} />
          <Route path="test" element={<Test />} />
          <Route path="*" element={<DashUI/>} />
        </Routes>
      </div>
    </div>
  );
};

export default Dashboard;
