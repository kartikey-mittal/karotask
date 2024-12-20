import React, { useState, useEffect } from "react";
import DOMPurify from 'dompurify';
import { useParams } from "react-router-dom";
import { doc, getDoc, collection, query, where, getDocs, updateDoc } from "firebase/firestore";
import { db } from "../../firebase"; 
import "./TaskDetails.css";
import UserTopLayer from '../components/UserTopLayer';
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
      // Step 1: Check currentSubmission and maxSubmission in the "tasks" collection
      const taskDocRef = doc(db, "tasks", id);
      const taskDocSnap = await getDoc(taskDocRef);
  
      if (taskDocSnap.exists()) {
        const taskData = taskDocSnap.data();
        const currentSubmission = taskData.currentSubmission || 0;
        const maxSubmission = taskData.maxSubmission || 0;
        const taskStatus = taskData.status;
  
        if (currentSubmission >= maxSubmission || taskStatus === "completed") {
          alert("Sorry. Unexpected error code 5");
          return;
        }
  
        // Step 2: Update participant status to 'need-approval'
        const participantDocRef = doc(db, "tasks", id, "participants", UID);
        await updateDoc(participantDocRef, {
          status: "need-approval",
        });
  
        const userDocRef = doc(db, "users", UID, "task", id);
        await updateDoc(userDocRef, {
          status: "need-approval",
        });
  
        // Step 3: Increment the currentSubmission value in the task document
        await updateDoc(taskDocRef, {
          currentSubmission: currentSubmission + 1,
        });
  
        // Step 4: Check if currentSubmission matches maxSubmission, and update task status if necessary
        if (currentSubmission + 1 === maxSubmission) {
          await updateDoc(taskDocRef, {
            status: "completed",
          });
        }
  
        alert("Task status updated successfully!");
        setTaskStatus("need-approval"); // Update UI to reflect new status
      } else {
        console.error("No such task document!");
      }
    } catch (error) {
      alert("Error updating task status:", error);
    }
  
    // Update task info in local storage
    const currentUserTaskInfo = JSON.parse(localStorage.getItem('userTaskInfo') || '[]');
    const updatedUserTaskInfo = currentUserTaskInfo.map(task =>
      task.id === taskDetails.taskID 
        ? { ...task, status: 'need-approval' } 
        : task
    );
    localStorage.setItem('userTaskInfo', JSON.stringify(updatedUserTaskInfo));
  }
  

  return (
    <>
      <div className="">
      <div style={{ position: 'fixed',width: '100%', zIndex: 0 }}>
      <UserTopLayer name="Tasks" icon={FaTasks} />
    </div>
       <div
      style={{
        marginTop: '0px', // Adjust this based on the height of TopLayer
        height: 'calc(100vh - 60px)', // Adjust height dynamically
        overflowY: 'auto',
        padding: '15px',
        fontFamily: 'DMM, sans-serif',
      }}
       >
        <div className="main-container" style={{flexDirection:isMobile?'column':'row',}}>
          <div className="about-task" style={{width:"100%",}}>
         
          <div className="bottom">
              <div className="status-bar">
                <h2 className="task-title" style={{fontFamily:'DMB'}}>
              {taskDetails.name}
                </h2>
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
                    <div className="task-value">₹ {taskDetails.price}</div>
                  </div>
                </div>
              </div>
              <div class="task-details-bottom">
                <h2 className="task-title" style={{color:"#757575",fontFamily:'DMM',fontSize:"1rem"}}>Tasks Overview</h2>
            
      
                      <span style={{fontFamily:'DMM'}}
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
                <button
  className="submit-task"
  onClick={taskStatus === 'ongoing' ? handleSubmitTask : null}
  style={{
    opacity: taskStatus === 'ongoing' ? 1 : 0.5,
    pointerEvents: taskStatus === 'ongoing' ? 'auto' : 'none',
  }}
>
  {taskStatus === 'ongoing' ? 'Submit Task' : "You’ve already submitted"}
</button>

              </div>
            </div>
          </div>
          <div className="bottom" style={{}}>
          <div class="about-client" >
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
           
              <span class="identity-status" style={{color:"#fff",fontFamily:'DMB',backgroundColor:"#238b41",paddingInline:"10px",borderRadius:'10px'}}> Verified</span>
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
      </div>
      </div>
    </>
  );
};

export default TaskDetails;
