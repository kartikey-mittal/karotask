import React, { useState } from "react";
import { db } from "../../firebase";
import { collection, addDoc, Timestamp, doc, setDoc } from "firebase/firestore";
import CreatorTopLayer from "../components/CreatorTopLayer";
import {
  FaTasks, FaClipboardList, FaTag, FaDollarSign, FaRupeeSign, FaWindowMaximize,
  FaCalendarAlt, FaCheckCircle, FaProjectDiagram, FaChartLine, FaFileUpload
} from "react-icons/fa";
import ContentEditable from "react-contenteditable";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { NavLink } from 'react-router-dom';

const CreateNewTask = () => {
  const UID = localStorage.getItem('Creator-UID');
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
  };

  const topLayerStyle = {
    flex: "0 0 auto",
    borderBottom: "1px solid #ccc",
    backgroundColor: "#f8f8f8",
    position: "fixed",
    top: 0,
    width: "100%",
    zIndex: 10,
  };

  const contentScrollableArea = {
    flex: 1,
    overflowY: "auto",
    marginTop: "70px",
    padding: "0 20px",
  };

  const formCardStyle = {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "10px",
    maxWidth: "90%",
    margin: "0 auto",
  };

  const rowStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "12px",
    padding: "10px",
    gap: "15px",
    marginBottom: "15px",
    backgroundColor: "#f7f9fb"
  };

  const labelStyle = {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px",
    color: "#a27777",
    fontSize: '0.79rem'
  };

  const iconStyle = {
    marginRight: "8px",
    color: "#777",
  };

  const buttonStyle = {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2f2f2f",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "15px",
    fontFamily: 'DMB'
  };

  const [formData, setFormData] = useState({
    category: "General Task",
    creator: "",
    creatorID: UID,
    currentSubmission: 0,
    dueDate: "",
    maxSubmission: 0, // Initialize with empty string
    name: "",
    overview: "",
    price: "", // Initialize with empty string
    priority: "",
    status: "under-review",
    taskID: "1",
    type: "",
    uploadedFile: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editing, setEditing] = useState(true);

  const handleInputChange = (e, fieldName) => {
    let value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        uploadedFile: file,
        name: file.name
      }));
    }
  };

  const handleOverviewChange = (value) => {
    setFormData(prev => ({
      ...prev,
      overview: value,
    }));
  };

  const handleSubmit = async () => {
    // Validate all required fields
    if (!formData.name || !formData.type || !formData.priority || !formData.price || !formData.maxSubmission || !formData.dueDate) {
      alert("Please fill out all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);

      // Create a reference to the tasks collection
      const taskRef = await addDoc(collection(db, "tasks"), {
        ...formData,
        createdAt: Timestamp.now(),
        dueDate: formData.dueDate ? Timestamp.fromDate(new Date(formData.dueDate)) : null,
      });

      // Now we have the document ID (taskRef.id)
      // Update the document with the generated taskID
      await setDoc(doc(db, "tasks", taskRef.id), {
        ...formData,
        taskID: taskRef.id,  // Save the generated document ID as taskID
        createdAt: Timestamp.now(),
        dueDate: formData.dueDate ? Timestamp.fromDate(new Date(formData.dueDate)) : null,
      });

      alert("Task created successfully!");
      // Reset form
      setFormData({
        category: "General Task",
        creator: "",
        creatorID: UID,
        currentSubmission: 0,
        dueDate: "",
        maxSubmission: 0, // Reset to empty string
        name: "",
        overview: "",
        price: "", // Reset to empty string
        priority: "",
        status: "under-review",
        taskID: "1",
        type: "",
        uploadedFile: null,
      });

      setIsSubmitting(false);
    } catch (error) {
      console.error("Error creating task:", error);
      setIsSubmitting(false);
    }
  };

  return (
    <div style={containerStyle}>
      <div style={topLayerStyle}>
        <CreatorTopLayer name="Create New Task" icon={FaTasks} />
      </div>

      <div style={contentScrollableArea}>
        <div style={formCardStyle}>
          {/* Task Title */}
          <div style={rowStyle}>
            <div style={{ ...labelStyle }}>
              <FaClipboardList style={iconStyle} /> Task Title
            </div>
            <ContentEditable
              html={formData.name}
              disabled={!editing}
              onChange={(e) => handleInputChange(e, "name")}
              
              tagName="span"
              style={{
                fontWeight: "500",
                fontSize: "14px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                backgroundColor: '#fff'
              }}
            />
          </div>

          {/* Task Type Dropdown */}
          <div style={rowStyle}>
            <div style={{ ...labelStyle }}>
              <FaProjectDiagram style={iconStyle} /> Task Type
            </div>
            <select
              value={formData.type}
              onChange={(e) => handleInputChange(e, "type")}
              style={{
                fontWeight: "500",
                fontSize: "14px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <option value="">Select Task Type</option>
              <option value="Normal">Normal</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          {/* Priority Dropdown */}
          <div style={rowStyle}>
            <div style={{ ...labelStyle }}>
              <FaChartLine style={iconStyle} /> Priority
            </div>
            <select
              value={formData.priority}
              onChange={(e) => handleInputChange(e, "priority")}
              style={{
                fontWeight: "500",
                fontSize: "14px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <option value="">Select Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          {/* Price and Max Submission */}
          <div style={{ display: "flex", gap: "10px", borderRadius: "12px", padding: "20px", backgroundColor: '#f7f9fb', marginBottom: "10px" }}>
            <div style={{ flex: 1 }}>
              <div style={{ ...labelStyle }}>
                <FaRupeeSign style={iconStyle} /> Price ( Per submission )
              </div>
              <input
                type="number"
                value={formData.price}
                onChange={(e) => handleInputChange(e, "price")}
                style={{
                  fontWeight: "500",
                  fontSize: "14px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "10px",
                  backgroundColor: '#fff'
                }}
              />
            </div>

            <div style={{ flex: 1 }}>

              <div style={{ ...labelStyle }}>
                <FaWindowMaximize style={iconStyle} /> Max Submission
              </div>
              <input
                type="number"
                value={formData.maxSubmission}
                onChange={(e) => handleInputChange(e, "maxSubmission")}
                style={{
                  fontWeight: "500",
                  fontSize: "14px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  padding: "10px",
                }}
              />
            </div>
          </div>

          {/* Due Date */}
          <div style={rowStyle}>
            <div style={{ ...labelStyle }}>
              <FaCalendarAlt style={iconStyle} /> Due Date
            </div>
            <input
              type="date"
              value={formData.dueDate}
              disabled={!editing}
              onChange={(e) => handleInputChange(e, "dueDate")}
              style={{
                fontWeight: "500",
                fontSize: "14px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
              }}
            />
          </div>

          {/* Task Overview (Rich Text Editor) */}
          <div style={rowStyle}>
            <div style={{ ...labelStyle }}>
              Task Overview
            </div>
            <ReactQuill
              theme="snow"
              value={formData.overview}
              onChange={handleOverviewChange}
              style={{
                fontSize: "14px",
                backgroundColor: "white", borderRadius: '1rem'
              }}
            />
          </div>

          {/* File Upload */}
          <div style={rowStyle}>
            <div style={{ ...labelStyle }}>
              <FaFileUpload style={iconStyle} /> Upload File
            </div>
            <input
              style={{
                fontWeight: "500",
                fontSize: "14px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "10px",
                width: "50%",
              }}
              type="file"
              onChange={handleFileChange}
            />
          </div>

          <button
            style={buttonStyle}
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Creating Task..." : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateNewTask;