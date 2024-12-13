import React from "react";
import { Routes, Route } from "react-router-dom";
import CreatorDashUI from "./CreatorDashUI";
import CreatorTask from "./CreatorTask";
import CreatorTaskDetails from "./CreatorTaskDetails";
import CreateNewTask from "./CreateNewTask";
import CreatorFAQ from './CreatorFAQ';




const CreatorDashboard = () => {
  return (
    <Routes>
      <Route path="*" element={<CreatorDashUI />} />
      <Route path="task" element={<CreatorTask />} />
      <Route path="task/create-task" element={<CreateNewTask />} />
      <Route path="task/task-info/:id" element={<CreatorTaskDetails />} />
      <Route path="earning" element={<CreatorDashUI />} />
      <Route path="faq" element={<CreatorFAQ />} />
     

    

    </Routes>
  );
};

export default CreatorDashboard;
