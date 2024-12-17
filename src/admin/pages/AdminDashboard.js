import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminDashUI from "./AdminDashUI";
import AdminTask from "./AdminTask";
import AdminTaskDetails from "./AdminTaskDetails";
import Payments from "./Payments";



const AdminDashboard = () => {
  return (
    <Routes>
      <Route path="*" element={<AdminDashUI />} />
      <Route path="task" element={<AdminTask />} />
      <Route path="task/task-info/:id" element={<AdminTaskDetails />} />
      <Route path="payments" element={<Payments />} />

    

    </Routes>
  );
};

export default AdminDashboard;
