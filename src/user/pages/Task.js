import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import {
  doc,
  setDoc,
  collection,
  serverTimestamp,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import TaskTable from "../components/TaskTable";
import UserTopLayer from "../components/UserTopLayer";
import { FaTasks } from "react-icons/fa";
import Loading from '../../components/Loading';

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
      const pendingTask = filteredTaskDetails.filter(
        (task) => task.status === "need-approval"
      );

      const allTasksSnapshot = await getDocs(
        query(
          tasksCollection,
          where("dueDate", ">", new Date()),
          orderBy("dueDate"),
          orderBy("createdAt", "desc")
        )
      );

      const allTasks = allTasksSnapshot.docs
        .filter(
          (taskDoc) =>
            !userTasks.some((userTask) => userTask.id === taskDoc.id) &&
            taskDoc.data().status !== "under-review"
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
        "Pending Tasks": pendingTask,
      };
    }
  } catch (error) {
    console.error("Error updating tasks in local storage:", error);
    return {
      "Available Tasks": [],
      "Ongoing Tasks": [],
      "Completed Tasks": [],
      "Pending Tasks": [],
    };
  }
};

const Task = () => {
  const [tasks, setTasks] = useState({
    "Available Tasks": [],
    "Ongoing Tasks": [],
    "Completed Tasks": [],
    "Pending Tasks": [],
  });
  const [activeTab, setActiveTab] = useState("Available Tasks");
  const UID = localStorage.getItem("User-UID");
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = screenWidth <= 768;

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const updatedTasks = await updateTasksInLocalStorage(UID);
      setTasks(updatedTasks);
      setLoading(false);
    };

    fetchTasks();
  }, [UID]);

  const handleStartTask = async (taskId) => {
    try {
      // Fetch the task document
      const taskRef = doc(db, "tasks", taskId);
      const taskSnapshot = await getDocs(taskRef);

      if (!taskSnapshot.empty) {
        const taskData = taskSnapshot.docs[0].data();

        // Only set to "ongoing" if the current status is "need-approval"
        if (taskData.status !== "ongoing") {
          // Proceed if the task is not already "ongoing"
          const participantsCollectionRef = collection(taskRef, "participants");

          // Add user to participants with "ongoing" status
          await setDoc(doc(participantsCollectionRef, UID), {
            createdAt: serverTimestamp(),
            status: "ongoing",
          });

          // Update the user's task status to "ongoing"
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("UID", "==", UID));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userTasksCollectionRef = collection(userDoc.ref, "task");

            // Set the task as "ongoing" for the user
            await setDoc(doc(userTasksCollectionRef, taskId), {
              createdAt: serverTimestamp(),
              status: "ongoing",
            });
          }
        } else {
          // Task is already ongoing, handle appropriately if needed
          console.log("Task is already ongoing");
        }

        // Fetch updated tasks
        const updatedTasks = await updateTasksInLocalStorage(UID);
        setTasks(updatedTasks);
      } else {
        console.error("Task not found.");
      }
    } catch (error) {
      console.error("Error starting task:", error);
      alert("Task is already in-progress");
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "sticky",
            top: 0,
            zIndex: 100,
            width: "100%",
          }}
        >
          <UserTopLayer name="Tasks" icon={FaTasks} />
        </div>
        <div
          style={{
            flexGrow: 1,
            overflowY: "auto",
            padding: "20px",
            fontFamily: "DMM, sans-serif",
            // Custom Scrollbar Styles
            scrollbarWidth: "thin",
            scrollbarColor: "#d63384 #f1f1f1",
          }}
          // WebKit (Chrome, Safari, newer versions of Opera) scrollbar styling
          className="custom-scrollbar"
        >
          {loading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%",
              }}
            >
              <Loading /> {/* Replace this with your actual loading component */}
            </div>
          ) : (
            <>
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
                    <TaskTable tasks={tasks[activeTab]} onStartTask={handleStartTask} page={7} />
                  ) : (
                    <p className="empty-state">No tasks available in this category.</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        .task-container {
          padding: 10px;
          font-family: "DMM";
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
          padding: 10px;
          background: #fff;
          border-radius: 8px;
          border-color: #000;
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