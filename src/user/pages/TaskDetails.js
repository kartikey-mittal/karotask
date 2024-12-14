import React, { useState, useEffect } from "react";
import DOMPurify from 'dompurify';
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs,updateDoc } from "firebase/firestore";
import { db } from "../../firebase"; // Make sure to import your Firestore instance
import "./TaskDetails.css";
import TaskTopLayer from "../components/UserTopLayer";
import {
  FaLock,
  FaQuestionCircle,
  FaSearch,
  FaSignOutAlt,
  FaTasks,
  FaUserCircle,
} from "react-icons/fa";

const TaskDetails = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  const { id } = useParams(); // Get task document ID from the route
  const UID = localStorage.getItem('User-UID'); // Static UID
  const [taskDetails, setTaskDetails] = useState('hey'); // To store task details
  const [taskStatus, setTaskStatus] = useState(null); // To store participant status

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        // 1. Fetch the main task document
        const taskDocRef = doc(db, "tasks", id);
        const taskDocSnap = await getDoc(taskDocRef);
    
        if (taskDocSnap.exists()) {
          const data = taskDocSnap.data();
          // Convert dueDate to a readable format
          if (data.dueDate) {
            data.dueDate = new Date(data.dueDate.seconds * 1000).toLocaleDateString(); // Convert to just the date
          }
          setTaskDetails(data);
          console.log(data);
        } else {
          console.error("No such task document!");
        }
    
        // 2. Query the participants subcollection for the specific UID
        const participantsCollectionRef = collection(db, "tasks", id, "participants");
        const q = query(participantsCollectionRef, where("__name__", "==", UID));
        const querySnapshot = await getDocs(q);
    
        if (!querySnapshot.empty) {
          const participantDoc = querySnapshot.docs[0];
          setTaskStatus(participantDoc.data().status); // Save the status in state
          console.log(participantDoc.data().status);
        } else {
          console.error("No participant document found for the given UID!");
        }
      } catch (error) {
        console.error("Error fetching task details:", error);
      }
    };
    

    fetchTaskDetails();
  }, [id, UID]);


  const handleSubmitTask = async ()=>{

    try {
      // Reference the participant document
      const participantDocRef = doc(db, "tasks", id, "participants", UID);
      
      // Update the `status` field to 'completed'
      await updateDoc(participantDocRef, {
        status: "completed",
      });

      const userDocRef = doc(db, "users", UID, "task", id);
      
      // Update the `status` field to 'completed'
      await updateDoc(userDocRef, {
        status: "completed",
      });
  
      alert("Task status updated successfully!");
      // Optionally update local state or UI here
      setTaskStatus("completed");
    } catch (error) {
      alert("Error updating task status:", error);
    }
    const currentUserTaskInfo = JSON.parse(localStorage.getItem('userTaskInfo') || '[]');
    const updatedUserTaskInfo = currentUserTaskInfo.map(task => 
      task.id === taskDetails.taskID 
        ? { ...task, status: 'completed' } 
        : task
    );
    localStorage.setItem('userTaskInfo', JSON.stringify(updatedUserTaskInfo));
  }
  return (
    <>
      <div className="container">
        <div className="main-container">
          <div className="about-task">
            <div className="topLayer">
              <TaskTopLayer/>
            </div>
            <div className="bottom">
              <div className="status-bar">
                <div className="task-title">
              {taskDetails.name}
                </div>
                <div className="task-details">
                  <div className="task-item">
                    <div className="task-label">Status</div>
                    <div className="status-badge in-progress">{taskStatus}</div>
                  </div>
                  <div className="divider"></div>
                  <div className="task-item">
                    <div className="task-label">Due Date</div>
                    <div className="task-value"> {taskDetails.dueDate}</div>
                  </div>
                  <div className="divider"></div>
                  <div className="task-item">
                    <div className="task-label">Price</div>
                    <div className="task-value">   ₹ {taskDetails.price}</div>
                  </div>
                </div>
              </div>
              <div class="task-details-bottom">
                <h2>Tasks Overview</h2>
            
      
                      <span 
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(taskDetails.overview)
                        }} 
                      />
                  
                
                <p>
                  <strong>Note:</strong> Do not delete the post from the group
                  as we can re-verify the forwarded post.
                </p>
                <div class="task-url">
                  <strong>Url:</strong> null
                  <button class="copy-btn">📋</button>
                </div>
                <button class="submit-task" onClick={handleSubmitTask} >Submit Task</button>
              </div>
            </div>
          </div>
          <div class="about-client">
            <h2>About Client</h2>
            <div class="client-header">
              <div class="client-image">
                <img
                  src="https://via.placeholder.com/60x60"
                  alt="Client Profile"
                  class="profile-pic"
                />
              </div>
              <h3 class="client-name">Justin Durby</h3>
              <div class="client-rating">
                <span class="star">★</span>
                <span class="star">★</span>
                <span class="star">★</span>
                <span class="star">★</span>
                <span class="star-empty">☆</span>
              </div>
              <div class="identity-status">Identity Verified</div>
            </div>
            <div class="client-stats">
              <div class="stat-item">
                <span>Total Spend</span>
                <span class="stat-value">₹142000</span>
              </div>
              <div class="divider"></div>
              <div class="stat-item">
                <span>Tasks</span>
                <span class="stat-value">14</span>
              </div>
            </div>
            <h4>Other Tasks Of This Client</h4>
            <ul class="other-tasks">
              <li class="task-item">
                <img
                  src="https://via.placeholder.com/30"
                  alt="Task Icon"
                  class="task-icon"
                />
                Post a Tweet on Twitter
                <span class="task-time">164 days ago</span>
              </li>
              <li class="task-item">
                <img
                  src="https://via.placeholder.com/30"
                  alt="Task Icon"
                  class="task-icon"
                />
                Upload Reel on Your Instagram
                <span class="task-time">148 days ago</span>
              </li>
              <li class="task-item">
                <img
                  src="https://via.placeholder.com/30"
                  alt="Task Icon"
                  class="task-icon"
                />
                [Featured] Upload Reel on Your Instagram with HashTags
                <span class="task-time">132 days ago</span>
              </li>
              <li class="task-item">
                <img
                  src="https://via.placeholder.com/30"
                  alt="Task Icon"
                  class="task-icon"
                />
                [IG reel] Upload Hindi Reel in Your Instagram Account
                <span class="task-time">132 days ago</span>
              </li>
              <li class="task-item">
                <img
                  src="https://via.placeholder.com/30"
                  alt="Task Icon"
                  class="task-icon"
                />
                [IG reel] Upload Hindi Reel in Your Instagram Account
                <span class="task-time">132 days ago</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskDetails;