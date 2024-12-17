import React, { useEffect, useState } from "react";
import { FaUserCircle, FaRegEnvelope, FaPhoneAlt, FaEdit } from "react-icons/fa";
import { getFirestore, doc, getDoc, collection, getDocs } from "firebase/firestore";
import Loading from "../../components/Loading";
const Popup = ({ onClose, user }) => {
  if (!user) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          width: "400px",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            backgroundColor: "transparent",
            border: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
          }}
        >
          &times;
        </button>
        <h2 style={{ marginBottom: "20px" }}>User Details</h2>
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <button
          onClick={onClose}
          style={{
            marginTop: "20px",
            backgroundColor: "#1890ff",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Okay, Done
        </button>
      </div>
    </div>
  );
};

const TaskCard = ({ name, email, phone, status, onViewSubmission,submittedDate  }) => {
  return (
    <div
      style={{
        width: "100%",
        border: "1px solid #e8e8e8",
        borderRadius: "8px",
        padding: "10px",
        margin: "5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        boxSizing: "border-box",
        backgroundColor: "#f7f9fb",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          <FaUserCircle size={40} style={{ color: "#1890ff" }} />
          <div style={{ marginLeft: "16px" }}>
            <h3 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "bold", color: "#333" }}>{name}</h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#666",
              }}
            >
              {/* <span>Status:</span> */}
              <span
                style={{
                  backgroundColor: "#fff3cd",
                  padding: "4px 4px",
                  borderRadius: "4px",
                  fontSize: "0.875rem",
                  color: "#555555",
                }}
              >
                {status}
              </span>
              {/* <span>Submitted:</span> */}
              <p
                style={{
                  backgroundColor: "#d8d8d8",
                  padding: "4px 4px",
                  borderRadius: "4px",
                  fontSize: "0.875rem",
                  color: "#555555",
                }}
              >
                {submittedDate }
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onViewSubmission}
          style={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#2f2f2f",
            color: "#fff",
            padding: "4px 8px",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
            fontFamily: "DMM",
          }}
        >
          <FaEdit style={{ marginRight: "4px" }} /> View Submission
        </button>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <p style={{ display: "flex", alignItems: "center", fontSize: "0.9rem", color: "#621c1c" }}>
          <FaRegEnvelope style={{ marginRight: "4px", color: "#afafaf" }} />
          {email}
        </p>
        <p style={{ color: "#e5ecf6" }}>|</p>
        <p style={{ display: "flex", alignItems: "center", fontSize: "0.9rem", color: "#621c1c" }}>
          <FaPhoneAlt style={{ marginRight: "4px", color: "#afafaf" }} />
          {phone}
        </p>
      </div>
    </div>
  );
};

const ProgressBar = ({ current, max }) => {
  const percentage = (current / max) * 100;
  return (
    <div style={{ margin: "10px 0" }}>
      <div
        style={{
          height: "8px",
          backgroundColor: "#e0e0e0",
          borderRadius: "4px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            backgroundColor: "#4caf50",
          }}
        ></div>
      </div>
      <p style={{ margin: "5px 0", fontSize: "0.9rem", color: "#333" }}>
        {current} / {max} tasks completed
      </p>
    </div>
  );
};

const TaskSubmission = ({ taskId }) => {
  const [loading, setLoading] = useState(true); // New loading state
  const [participants, setParticipants] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [taskStats, setTaskStats] = useState({ maxSubmission: 0, currentSubmission: 0 });
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const db = getFirestore();

      try {
        const taskDocRef = doc(db, "tasks", taskId);
        const taskDocSnapshot = await getDoc(taskDocRef);
        const { maxSubmission, currentSubmission } = taskDocSnapshot.data();
        setTaskStats({ maxSubmission, currentSubmission });
        if (!taskDocSnapshot.exists()) {
          console.error("Task document not found.");
          setLoading(false);
          return;
        }

        const participantsCollectionRef = collection(taskDocRef, "participants");
  
        const participantsSnapshot = await getDocs(participantsCollectionRef);
        console.log(participantsSnapshot);
        const participantIds = participantsSnapshot.docs.map((doc) => doc.id);

        const fetchedParticipants = [];

        for (const participantId of participantIds) {
          const userDocRef = doc(db, "users", participantId);
          const userDocSnapshot = await getDoc(userDocRef);

          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            const userTaskDocRef = doc(userDocRef, "task", taskId);
            const userTaskSnapshot = await getDoc(userTaskDocRef);

            const status = userTaskSnapshot.exists()
              ? userTaskSnapshot.data().status
              : "No status";
                const submittedDateTimestamp = userTaskSnapshot.exists()
    ? userTaskSnapshot.data().createdAt
    : null;

  // Convert Firebase Timestamp to readable date
  const submittedDate = submittedDateTimestamp
    ? new Date(submittedDateTimestamp.seconds * 1000).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "No Date";

            fetchedParticipants.push({
              name: userData.name,
              email: userData.email,
              phone: userData.phone,
              status,submittedDate
            });
          }
        }
console.log(fetchedParticipants);
        setParticipants(fetchedParticipants);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // Hide loading popup
      }
    };

    fetchData();
  }, [taskId]);

  if (loading) {
    return <Loading />; // Show loading component
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        fontFamily: "DMM, sans-serif",
      }}
    >
       <ProgressBar
        current={taskStats.currentSubmission}
        max={taskStats.maxSubmission}
      />
      {participants.map((participant, index) => (
       <TaskCard
       key={index}
       name={participant.name}
       email={participant.email}
       phone={participant.phone}
       status={participant.status}
       submittedDate={participant.submittedDate} // Correct spelling here
       onViewSubmission={() => setSelectedUser(participant)}
     />
     
      ))}
      {selectedUser && (
        <Popup
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}
    </div>
  );
};

export default TaskSubmission;
