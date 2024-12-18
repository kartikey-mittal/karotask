import React, { useState ,useEffect} from "react";
import AdminTopLayer from "../components/AdminTopLayer";
import { FaTasks } from "react-icons/fa";
import { useLocation } from 'react-router-dom';
import { doc, updateDoc, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";
import {FaClipboardList, FaTag, FaDollarSign, FaRupeeSign ,FaWindowMaximize ,
FaCalendarAlt, FaCheckCircle, FaProjectDiagram,FaChartLine, FaFileUpload } from "react-icons/fa";
import ContentEditable from "react-contenteditable";
import ReactQuill from "react-quill"; // Import ReactQuill
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import { useParams } from 'react-router-dom';




const TaskForm = ({ data, taskId }) => {
  // Convert date format from DD/MM/YYYY to YYYY-MM-DD for date input
  const convertDateFormat = (dateString) => {
    if (!dateString) return "";
    const [day, month, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  };

  // State to manage form inputs
  const [title, setTitle] = useState(data?.title || "");
  const [description, setDescription] = useState(data?.description || "");
  const [price, setPrice] = useState(data?.price || 0);
  const [dueDate, setDueDate] = useState(convertDateFormat(data?.dueDate) || "");
  const [maxSubmissions, setMaxSubmissions] = useState(data?.maxSubmission || 0);
  const [tags, setTags] = useState(data?.tags ? data.tags[0] : "General Task");
  const [loading, setLoading] = useState(false);

  // Predefined tag options
  const tagOptions = [
    "General Task",
    "Design",
    "Writing",
    "Programming",
    "Marketing",
    "Translation",
    "Research"
  ];

  // Submit handler to update Firestore
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const docRef = doc(db, "tasks", taskId);
      await updateDoc(docRef, {
        name:title,
        overview: description,
        price,
        dueDate: Timestamp.fromDate(new Date(dueDate)),
        maxSubmission: maxSubmissions,
        category: tags,
        status:'ongoing'
      });
      alert("Task updated successfully!");
    } catch (error) {
      console.error("Error updating task: ", error);
      alert("Failed to update task.");
    } finally {
      setLoading(false);
    }
  };

  // Styles object
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      padding: "10px",
      gap: "15px",
      fontFamily: "DMM, sans-serif",
    },
    inputContainer: {
      display: "flex",
      flexDirection: "column",
      marginBottom: "0px",
      backgroundColor: "#f9f9f9",
      borderRadius: "15px",
      padding: "10px",
    },
    horizontalContainer: {
      display: "flex",
      gap: "15px",
    },
    halfWidth: {
      flex: 1,
      padding: "10px",
      borderRadius: "5px",
      backgroundColor: "#f9f9f9",
    },
    label: {
      display: "flex",
      alignItems: "center",
      marginBottom: "5px",
      color: "#333",
      fontWeight: "600",
    },
    input: {
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      fontSize: "14px",
      width: "100%",
      boxSizing: "border-box",
    },
    select: {
      padding: "10px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      fontSize: "14px",
      width: "100%",
      backgroundColor: "white",
    },
    quillContainer: {
      height: "200px",
      marginBottom: "0px",
      backgroundColor: "white",
    },
    iconStyle: {
      marginRight: "8px",
      color: "#ff4081",
    },
    submitButton: {
      marginTop: "10px",
      padding: "10px 20px",
      backgroundColor: "#ff4081",
      color: "#fff",
      fontSize: "16px",
  fontFamily:'DMB',
      border: "none",
      borderRadius: "5px",
      cursor: loading ? "not-allowed" : "pointer",
      alignSelf: "center",width:'50%',marginBottom:'5px'
    },
  };

  return (
    <div style={styles.container}>
      {/* Task Title */}
      <div style={styles.inputContainer}>
        <label style={styles.label}>
          <FaClipboardList style={styles.iconStyle} /> Task Title
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={styles.input}
          placeholder="Enter task title"
        />
      </div>

      {/* Task Description */}
      <div style={styles.inputContainer}>
        <label style={styles.label}>
          <FaClipboardList style={styles.iconStyle} /> Task Description
        </label>
        <div style={styles.quillContainer}>
          <ReactQuill
            value={description}
            onChange={setDescription}
            theme="snow"
            style={{ height: "150px", backgroundColor: "white", borderRadius: "10px" }}
          />
        </div>
      </div>

      {/* Tags */}
      <div style={styles.inputContainer}>
        <label style={styles.label}>
          <FaTag style={styles.iconStyle} /> Tags
        </label>
        <select
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          style={styles.select}
        >
          {tagOptions.map((tag) => (
            <option key={tag} value={tag}>{tag}</option>
          ))}
        </select>
      </div>

      {/* Price and Max Submissions */}
      <div style={styles.horizontalContainer}>
        <div style={{ ...styles.inputContainer, ...styles.halfWidth }}>
          <label style={styles.label}>
            <FaRupeeSign style={styles.iconStyle} /> Price
          </label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            style={styles.input}
            placeholder="Enter task price"
          />
        </div>
        <div style={{ ...styles.inputContainer, ...styles.halfWidth }}>
          <label style={styles.label}>
            <FaCheckCircle style={styles.iconStyle} /> Max Submissions
          </label>
          <input
            type="number"
            value={maxSubmissions}
            onChange={(e) => setMaxSubmissions(Number(e.target.value))}
            style={styles.input}
            placeholder="Maximum submissions"
          />
        </div>
      </div>

      {/* Due Date */}
      <div style={{ ...styles.inputContainer, ...styles.halfWidth }}>
        <label style={styles.label}>
          <FaCalendarAlt style={styles.iconStyle} /> Due Date
        </label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          style={styles.input}
        />
      </div>

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        style={styles.submitButton}
        disabled={loading}
      >
        {loading ? "Updating..." : "Approve"}
      </button>
    </div>
  );
};





const AdminTaskDetails = () => {
  const location = useLocation();
  const taskData = location.state; 
  const { taskId } = useParams(); // URL se 'id' ko extract karega
  console.log(taskData);

  const [activeTab, setActiveTab] = useState("Edit Task");

  return (
    <div style={{ height: "100vh", overflow: "hidden" }}>
      {/* Top Layer */}
      <div style={{ position: "fixed", top: 0, width: "100%", zIndex: 10 }}>
        <AdminTopLayer name="Task Details" icon={FaTasks} />
        {/* Tabs */}
        <div
          className="tabs"
          style={{
            display: "flex",
            borderBottom: "2px solid #ddd",
            backgroundColor: "#fff",
          }}
        >
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
      </div>

      {/* Scrollable Content */}
      <div
        style={{
          marginTop: "100px", // Adjust to match the combined height of the top layer and tabs
          height: "calc(100vh - 120px)",
          overflowY: "auto",
          padding: "10px",
        }}
      >
        {activeTab === "Edit Task" ? (
          <div>
            <TaskForm data={taskData} taskId={taskData.id} />
          </div>
        ) : (
          <div>
          {/* <TaskSubmission data={taskData} taskId={taskData.id}/> */}
          <div>Able to see submissions from users</div>
        </div>
        )}
      </div>
    </div>
  );
};


export default AdminTaskDetails;
