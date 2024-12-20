import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import TaskTable from "../components/TaskTable";
import UserTopLayer from "../components/UserTopLayer";
import { FaTasks } from "react-icons/fa";

const updateTasksInLocalStorage = async (UID) => {
  try {
    const usersQuery = query(collection(db, "users"), where("UID", "==", UID));
    const usersSnapshot = await getDocs(usersQuery);

    if (!usersSnapshot.empty) {
      const userDoc = usersSnapshot.docs[0];
      const userTasksQuery = collection(db, "users", userDoc.id, "task");
      const userTasksSnapshot = await getDocs(userTasksQuery);

      const userTasks = userTasksSnapshot.docs.map((doc) => ({
        id: doc.id,
        status: doc.data().status || "Not Available",
        name: doc.data().name || "Unnamed Task",
      }));

      const tasksCollection = collection(db, "tasks");
      const taskDetails = await Promise.all(
        userTasks.map(async (task) => {
          const taskDocQuery = query(
            tasksCollection,
            where("__name__", "==", task.id)
          );
          const taskDocSnapshot = await getDocs(taskDocQuery);

          if (!taskDocSnapshot.empty) {
            const taskDocData = taskDocSnapshot.docs[0].data();
            return {
              id: task.id,
              name: taskDocData.name || "Unnamed Task",
              price: taskDocData.price ? `₹${taskDocData.price}` : "N/A",
              dueDate: taskDocData.dueDate
                ? taskDocData.dueDate.toDate().toLocaleDateString()
                : "N/A",
              status: task.status,
            };
          }
          return null;
        })
      );

      const filteredTaskDetails = taskDetails.filter(Boolean);
      const ongoingTasks = filteredTaskDetails.filter(
        (task) => task.status === "ongoing"
      );
      const completedTasks = filteredTaskDetails.filter(
        (task) => task.status === "completed"
      );

      const allTasksSnapshot = await getDocs(collection(db, "tasks"));
      const allTasks = allTasksSnapshot.docs
        .filter(
          (taskDoc) =>
            !userTasks.some((userTask) => userTask.id === taskDoc.id)
        )
        .map((taskDoc) => {
          const taskData = taskDoc.data();
          return {
            id: taskDoc.id,
            name: taskData.name || "Unnamed Task",
            price: taskData.price ? `₹${taskData.price}` : "N/A",
            dueDate: taskData.dueDate
              ? taskData.dueDate.toDate().toLocaleDateString()
              : "N/A",
          };
        });

      return {
        "Available Tasks": allTasks,
        "Ongoing Tasks": ongoingTasks,
        "Completed Tasks": completedTasks,
      };
    }
  } catch (error) {
    console.error("Error updating tasks in local storage:", error);
    return {
      "Available Tasks": [],
      "Ongoing Tasks": [],
      "Completed Tasks": [],
    };
  }
};

const Task = () => {

  const [tasks, setTasks] = useState({
    "Available Tasks": [],
    "Ongoing Tasks": [],
    "Completed Tasks": [],
  });
  const [activeTab, setActiveTab] = useState("Available Tasks");
  const UID = localStorage.getItem("User-UID");
const [screenWidth, setScreenWidth] = useState(window.innerWidth); 

   useEffect(() => {
      const handleResize = () => setScreenWidth(window.innerWidth);
  
      window.addEventListener('resize', handleResize);
  
      return () => window.removeEventListener('resize', handleResize);
    }, []);

    const isMobile = screenWidth <= 768;
  useEffect(() => {
    const fetchTasks = async () => {
      const updatedTasks = await updateTasksInLocalStorage(UID);
      setTasks(updatedTasks);
    };

    fetchTasks();
  }, [UID]);

  const handleStartTask = async (taskId) => {
    try {
      const taskRef = doc(db, "tasks", taskId);
      const participantsCollectionRef = collection(taskRef, "participants");

      await setDoc(doc(participantsCollectionRef, UID), {
        createdAt: serverTimestamp(),
        status: "ongoing",
      });

      const usersRef = collection(db, "users");
      const q = query(usersRef, where("UID", "==", UID));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userTasksCollectionRef = collection(userDoc.ref, "task");

        await setDoc(doc(userTasksCollectionRef, taskId), {
          createdAt: serverTimestamp(),
          status: "ongoing",
        });
      }

      const updatedTasks = await updateTasksInLocalStorage(UID);
      setTasks(updatedTasks);
    } catch (error) {
      console.error("Error starting task:", error);
      alert("Failed to start task. Please try again.");
    }
  };

  return (
    <>
  <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
       <div 
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          width: '100%',
        }}
      >
      <UserTopLayer name="Tasks" icon={FaTasks} /></div>
      <div 
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '20px',
          fontFamily: 'DMM, sans-serif',
          // Custom Scrollbar Styles
          scrollbarWidth: 'thin',
          scrollbarColor: '#d63384 #f1f1f1',
        }}
        // WebKit (Chrome, Safari, newer versions of Opera) scrollbar styling
        className="custom-scrollbar"
      >
      <div className="task-container">
        <div className="tabs">
          {Object.keys(tasks).map((tab) => (
            <div
              key={tab}
              className={`tab ${activeTab === tab ? "active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
        <div className="task-content">
          {Array.isArray(tasks[activeTab]) && tasks[activeTab].length > 0 ? (
            <TaskTable tasks={tasks[activeTab]} onStartTask={handleStartTask} />
          ) : (
            <p className="empty-state">No tasks available in this category.</p>
          )}
        </div>
      </div>
      </div>
      </div>
      <style jsx>{`
        .task-container {
          padding: 10px;
          font-family: "DMM,;
          background: #f8f9fa;
          border-radius: 8px;
          // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .tabs {
          display: flex;
          justify-content: space-between;
          margin-bottom: 15px;
        }
        .tab {
          flex: 1;
          text-align: center;
          padding: 12px;
          cursor: pointer;
          border: 1px solid #ddd;
          border-radius: 4px;
          margin-right: 10px;
          transition: all 0.3s ease;
          font-weight: bold;
          color: #444;
        }
        .tab:last-child {
          margin-right: 0;
        }
        .tab.active {
          background-color: #ff4081;
          color: #fff;
        }
        .task-content {
          padding: ;
          background: #fff;
          border-radius: 8px;
          border-color:#000;
          // box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        .empty-state {
          text-align: center;
          color: #aaa;
        }
           .custom-scrollbar::-webkit-scrollbar {
          width: 6px; /* Thin scrollbar */
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1; /* Light background for the track */
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #d63384; /* Red/pinkish color for the scrollbar */
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #a30b4d; /* Slightly darker on hover */
        }
        @media (max-width: 768px) {
          .tabs {
            flex-direction: column;
          }
          .tab {
            margin-bottom: 10px;
          }
        }
      `}</style>
    </>
  );
};

export default Task;