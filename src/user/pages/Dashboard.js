import React from "react";
import { Routes, Route } from "react-router-dom";
import Earning from "./Earning";
import Task from "./Task";
import DashUI from "./DashUI";
import FAQ from './FAQ'
import TaskDetails from './TaskDetails'
const Dashboard = () => {
  return (
    <Routes>
      <Route path="*" element={<DashUI />} />
      <Route path="earning" element={<Earning />} />
      <Route path="task" element={<Task />} />
      <Route path="task/task-details/:id" element={<TaskDetails />} />
      <Route path="faq" element={<FAQ />} />

      <Route path="*" element={<DashUI />} />

    </Routes>
  );
};

export default Dashboard;
