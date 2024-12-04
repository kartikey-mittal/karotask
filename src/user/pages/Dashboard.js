import React from "react";
import { Routes, Route } from "react-router-dom";
import Earning from "./Earning";
import Task from "./Task";
import DashUI from "./DashUI";

const Dashboard = () => {
  return (
    <Routes>
      <Route path="earning" element={<Earning />} />
      <Route path="task" element={<Task />} />
      <Route path="*" element={<DashUI />} />
    </Routes>
  );
};

export default Dashboard;
