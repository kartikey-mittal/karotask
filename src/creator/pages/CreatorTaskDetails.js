import React, { useState } from "react";
import CreatorTopLayer from "../components/CreatorTopLayer";
import { FaTasks } from "react-icons/fa";

const CreatorTaskDetails = () => {
  const [activeTab, setActiveTab] = useState("Edit Task");

  return (
    <>
      <CreatorTopLayer name="Task Details" icon={FaTasks} />
      <div style={{ padding: "20px", fontFamily: "DMM, sans-serif" }}>
        {/* Tabs */}
        <div className="tabs" style={{ display: "flex", borderBottom: "2px solid #ddd" }}>
          {["Edit Task", "View Submissions"].map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "10px 20px",
                cursor: "pointer",
                fontWeight: activeTab === tab ? "bold" : "normal",
                color: activeTab === tab ? "#ff4081" : "#858585",
                borderBottom: activeTab === tab ? "2px solid #ff4081" : "none",
              }}
            >
              {tab}
            </div>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ marginTop: "20px" }}>
          {activeTab === "Edit Task" ? (
            <form style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <label>
                Task Category
                <input type="text" defaultValue="Data Entry" />
              </label>
              <label>
                Task Type
                <input type="text" defaultValue="General Task" />
              </label>
              <label>
                Task Title
                <input type="text" defaultValue="Task -1" />
              </label>
              <label>
                Task Description
                <textarea defaultValue="Call 50 Students & take feedback." rows="4" />
              </label>
              <label>
                Experience Required
                <input type="text" defaultValue="Intermediate" />
              </label>
              <label>
                Bonus Points
                <input type="number" defaultValue="17.00" />
              </label>
              <label>
                No of Submissions
                <input type="number" defaultValue="40" />
              </label>
              <label>
                ₹ Price (Per Submission)
                <input type="number" defaultValue="10.00" />
              </label>
              <label>
                Due Date
                <input type="date" defaultValue="2024-12-11" />
              </label>
              <label>
                Task Status
                <select defaultValue="Open">
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                  <option value="Pending">Pending</option>
                </select>
              </label>
              <button
                type="submit"
                style={{
                  backgroundColor: "#ff4081",
                  color: "#fff",
                  padding: "10px 20px",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                  fontFamily: "DMM, sans-serif",
                }}
              >
                Save Changes
              </button>
            </form>
          ) : (
            <p style={{ fontSize: "1rem", color: "#333" }}>Submissions</p>
          )}
        </div>
      </div>
    </>
  );
};

export default CreatorTaskDetails;
