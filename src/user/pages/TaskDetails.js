import React, { useState, useEffect } from "react";
import DOMPurify from 'dompurify';
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase"; 
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
  const [isMobile, setIsMobile] = useState(false); 
  const [taskDetails, setTaskDetails] = useState('hey');
  const [taskStatus, setTaskStatus] = useState(null); 
  const { id } = useParams(); 
  const UID = localStorage.getItem('User-UID'); 

  const otherTasks = [
    {
      name: "Post a Tweet on Twitter",
      time: "164 days ago",
      icon: "https://via.placeholder.com/30"
    },
    {
      name: "Upload Reel on Your Instagram",
      time: "148 days ago",
      icon: "https://via.placeholder.com/30"
    },
    {
      name: "[Featured] Upload Reel on Your Instagram with HashTags",
      time: "132 days ago",
      icon: "https://via.placeholder.com/30"
    },
    {
      name: "[IG reel] Upload Hindi Reel in Your Instagram Account",
      time: "132 days ago",
      icon: "https://via.placeholder.com/30"
    },
    {
      name: "[IG reel] Upload Hindi Reel in Your Instagram Account",
      time: "132 days ago",
      icon: "https://via.placeholder.com/30"
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); 
    };
    
    handleResize();
    
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const taskDocRef = doc(db, "tasks", id);
        const taskDocSnap = await getDoc(taskDocRef);

        if (taskDocSnap.exists()) {
          const data = taskDocSnap.data();
          if (data.dueDate) {
            data.dueDate = new Date(data.dueDate.seconds * 1000).toLocaleDateString();
          }
          setTaskDetails(data);
          console.log(data);
        } else {
          console.error("No such task document!");
        }

        const participantsCollectionRef = collection(db, "tasks", id, "participants");
        const q = query(participantsCollectionRef, where("__name__", "==", UID));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const participantDoc = querySnapshot.docs[0];
          setTaskStatus(participantDoc.data().status);
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

  const handleSubmitTask = async () => {
    try {
      const participantDocRef = doc(db, "tasks", id, "participants", UID);
      await updateDoc(participantDocRef, { status: "completed" });

      const userDocRef = doc(db, "users", UID, "task", id);
      await updateDoc(userDocRef, { status: "completed" });

      alert("Task status updated successfully!");
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
      <TaskTopLayer />
        <div className="main-container">
          <div className="about-task">
         
            <div className="bottom" style={{padding:isMobile ? '0px' : '10px'}}>
              <div className="status-bar" style={{ flexDirection: isMobile ? 'column' : 'column', }}>
                <div className="task-title">{taskDetails.name}</div>
                <div className="task-details" style={{ flexDirection: isMobile ? 'row' : 'row', }}>
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
                    <div className="task-value">₹ {taskDetails.price}</div>
                  </div>
                </div>
              </div>
              <div className="task-details-bottom">
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
                <div className="task-url">
                  <strong>Url:</strong> null
                  <button className="copy-btn">📋</button>
                </div>
                <button className="submit-task" onClick={handleSubmitTask}>Submit Task</button>
              </div>
            </div>
          </div>

          
          {!isMobile && (
            <div className="about-client"  style={{width:'100%'}}>
              <h2>About Client</h2>
              <div className="client-header">
                <div className="client-image">
                  <img
                    src="https://via.placeholder.com/60x60"
                    alt="Client Profile"
                    className="profile-pic"
                  />
                </div>
                <h3 className="client-name">Justin Durby</h3>
                <div className="client-rating">
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star">★</span>
                  <span className="star-empty">☆</span>
                </div>
                <div className="identity-status">Identity Verified</div>
              </div>
              <div className="client-stats">
                <div className="stat-item">
                  <span>Total Spend</span>
                  <span className="stat-value">₹142000</span>
                </div>
                <div className="divider"></div>
                <div className="stat-item">
                  <span>Tasks</span>
                  <span className="stat-value">14</span>
                </div>
              </div>
              <h4>Other Tasks Of This Client</h4>
            <ul className="other-tasks">
              {otherTasks.map((task, index) => (
                <li key={index} className="task-item">
                  <img
                    src={task.icon}
                    alt="Task Icon"
                    className="task-icon"
                  />
                  {task.name}
                  <span className="task-time">{task.time}</span>
                </li>
              ))}
            </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TaskDetails;
