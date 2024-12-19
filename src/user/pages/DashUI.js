import React, { useState, useEffect } from 'react';
import StatBox from '../components/StatBox';
import TaskStatus from '../components/TaskStatus';
import TaskTable from '../components/TaskTable';
import { FaTasks, FaSpinner, FaRegClock, FaRupeeSign, FaBell, FaTimes } from 'react-icons/fa';
import UserTopLayer from '../components/UserTopLayer';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { 
  doc, 
  setDoc, 
  serverTimestamp, 
} from 'firebase/firestore';

// Utility function to update tasks in local storage
const updateTasksInLocalStorage = async (UID) => {
  try {
    const usersQuery = query(collection(db, 'users'), where('UID', '==', UID));
    const usersSnapshot = await getDocs(usersQuery);

    if (!usersSnapshot.empty) {
      const userDoc = usersSnapshot.docs[0];
      const userTasksQuery = collection(db, 'users', userDoc.id, 'task');
      const userTasksSnapshot = await getDocs(userTasksQuery);

      const userTasks = userTasksSnapshot.docs.map(doc => ({
        id: doc.id,
        status: doc.data().status || 'Not Available',
        name: doc.data().name || 'Unnamed Task',
      }));

      const tasksCollection = collection(db, 'tasks');
      const taskDetails = await Promise.all(
        userTasks.map(async task => {
          const taskDocQuery = query(tasksCollection, where('__name__', '==', task.id));
          const taskDocSnapshot = await getDocs(taskDocQuery);

          if (!taskDocSnapshot.empty) {
            const taskDocData = taskDocSnapshot.docs[0].data();
            return {
              id: task.id,
              name: taskDocData.name || 'Unnamed Task',
              price: taskDocData.price ? `₹${taskDocData.price}` : 'N/A',
              dueDate: taskDocData.dueDate
                ? taskDocData.dueDate.toDate().toLocaleDateString()
                : 'N/A',
              status: task.status,
            };
          }
          return null;
        })
      );

      const filteredTaskDetails = taskDetails.filter(Boolean);

      const ongoingTasks = filteredTaskDetails.filter(task => task.status === 'ongoing');
      const completedTasks = filteredTaskDetails.filter(task => task.status === 'completed');

      const allTasksSnapshot = await getDocs(collection(db, 'tasks'));
      const allTasks = allTasksSnapshot.docs
        .filter(taskDoc => !userTasks.some(userTask => userTask.id === taskDoc.id))
        .map(taskDoc => {
          const taskData = taskDoc.data();
          return {
            id: taskDoc.id,
            name: taskData.name || 'Unnamed Task',
            price: taskData.price ? `₹${taskData.price}` : 'N/A',
            dueDate: taskData.dueDate
              ? (taskData.dueDate.toDate ? taskData.dueDate.toDate().toLocaleDateString() : 'N/A')
              : 'N/A',
          };
        });

      localStorage.setItem('userTaskInfo', JSON.stringify(filteredTaskDetails));
      localStorage.setItem('allTasks', JSON.stringify(allTasks));

      return {
        'Available Tasks': allTasks,
        'Ongoing Tasks': ongoingTasks,
        'Completed Tasks': completedTasks,
      };
    }

    return {
      'Available Tasks': [],
      'Ongoing Tasks': [],
      'Completed Tasks': [],
    };
  } catch (error) {
    console.error('Error updating tasks in local storage:', error);
    return {
      'Available Tasks': [],
      'Ongoing Tasks': [],
      'Completed Tasks': [],
    };
  }
};

const TopLayer = () => {
  return <UserTopLayer name="Dashboard" icon={FaTasks} />;
};

const DashUI = () => {
  const [tasks, setTasks] = useState([]);
  const [userTaskInfo, setUserTaskInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalTasks, setTotalTasks] = useState(0);
  const [ongoingTasks, setOngoingTasks] = useState(0);
  const [pendingApprovalTasks, setPendingApprovalTasks] = useState(0);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth); 

  const UID = localStorage.getItem('User-UID'); // Replace with dynamic UID
 

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);

        const usersQuery = query(collection(db, 'users'), where('UID', '==', UID));
        const usersSnapshot = await getDocs(usersQuery);

        if (!usersSnapshot.empty) {
          const userDoc = usersSnapshot.docs[0];
          const userTasksQuery = collection(db, 'users', userDoc.id, 'task');
          const userTasksSnapshot = await getDocs(userTasksQuery);

          const userTasks = userTasksSnapshot.docs.map(doc => ({
            id: doc.id,
            status: doc.data().status || 'Not Available',
            name: doc.data().name || 'Unnamed Task',
          }));

          const ongoingCount = userTasks.filter(task => task.status === 'ongoing').length;
          const completedCount = userTasks.filter(task => task.status === 'completed').length;

          const tasksCollection = collection(db, 'tasks');
          const taskDetails = await Promise.all(
            userTasks.map(async task => {
              const taskDocQuery = query(tasksCollection, where('__name__', '==', task.id));
              const taskDocSnapshot = await getDocs(taskDocQuery);

              if (!taskDocSnapshot.empty) {
                const taskDocData = taskDocSnapshot.docs[0].data();
                return {
                  id: task.id,
                  name: taskDocData.name || 'Unnamed Task',
                  price: taskDocData.price ? `₹${taskDocData.price}` : 'N/A',
                  dueDate: taskDocData.dueDate
                    ? taskDocData.dueDate.toDate().toLocaleDateString()
                    : 'N/A',
                  status: task.status,
                };
              }
              return null;
            })
          );

          const filteredTaskDetails = taskDetails.filter(Boolean);

          setUserTaskInfo(filteredTaskDetails);

          const allTasksSnapshot = await getDocs(collection(db, 'tasks'));

          const allTasks = allTasksSnapshot.docs
            .filter(taskDoc => !userTasks.some(userTask => userTask.id === taskDoc.id))
            .map(taskDoc => {
              const taskData = taskDoc.data();
              return {
                id: taskDoc.id,
                name: taskData.name || 'Unnamed Task',
                price: taskData.price ? `₹${taskData.price}` : 'N/A',
                dueDate: taskData.dueDate
                  ? (taskData.dueDate.toDate ? taskData.dueDate.toDate().toLocaleDateString() : 'N/A')
                  : 'N/A',
              };
            });

          setTasks(allTasks);
          setTotalTasks(allTasks.length);
          setOngoingTasks(ongoingCount);
          setPendingApprovalTasks(completedCount);
        }
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [UID]);

  const handleStartTask = async (taskId) => {
    try {
      const taskRef = doc(db, 'tasks', taskId);
      const participantsCollectionRef = collection(taskRef, 'participants');

      await setDoc(doc(participantsCollectionRef, UID), {
        createdAt: serverTimestamp(),
        status: 'ongoing'
      });

      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('UID', '==', UID));

      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userTasksCollectionRef = collection(userDoc.ref, 'task');
        
        await setDoc(doc(userTasksCollectionRef, taskId), {
          createdAt: serverTimestamp(),
          status: 'ongoing'
        });
      }

      alert(`Task started!\nUser ID: ${UID}\nTask ID: ${taskId}`);

      const updatedTasks = await updateTasksInLocalStorage(UID);
      setTasks(updatedTasks);

      const ongoingCount = updatedTasks['Ongoing Tasks'].length;
      const completedCount = updatedTasks['Completed Tasks'].length;
      
      setOngoingTasks(ongoingCount);
      setPendingApprovalTasks(completedCount);
      setTotalTasks(updatedTasks['Available Tasks'].length);

    } catch (error) {
      console.error('Error starting task:', error);
      alert('Failed to start task. Please try again.');
    }
  };

  const isMobile = screenWidth <= 768;

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
      {/* Fixed Top Layer */}
      <div 
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          width: '100%',
        }}
      >
        <UserTopLayer name="Dashboard" icon={FaTasks} />
      </div>

      {/* Scrollable Content */}
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
        <div 
          style={{
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row', 
            justifyContent: 'space-between', 
            marginBottom: '20px',
            flexWrap: isMobile ? 'wrap' : 'wrap',
            overflowX: 'hidden'
          }}
        >
          <StatBox icon={<FaTasks size="2em" />} title="Total Tasks" value={totalTasks} color="#edf0ff" />
          <StatBox icon={<FaSpinner size="2em" />} title="Ongoing Tasks" value={ongoingTasks} color="#ffe8ef" />
          <StatBox icon={<FaRegClock size="2em" />} title="Pending Approval" value={pendingApprovalTasks} color="#fcd4c8" />
          <StatBox icon={<FaRupeeSign size="2em" />} title="My Earnings" value="₹15,000" color="#fff3d4" />
        </div>

        <div 
          style={{
            backgroundColor: '#E8F5E9',
            padding: '5px',
            borderRadius: '10px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: isMobile ? 'column' : 'row',
            textAlign: isMobile ? 'center' : 'left',
          }}
        >
          <FaBell style={{ marginRight: '10px', color: '#a30b4d' ,fontSize: isMobile?'0.8rem':'1rem'  }} />
          <p style={{ margin: '0', flexGrow: '1', fontSize: isMobile?'0.5rem':'1rem' }}>
            You need to update your KYC, profile, social media links, and UPI; only then you'll be able to make withdraw requests.
          </p>
          <FaTimes style={{ cursor: 'pointer',display:isMobile?'none':'block' }} />
        </div>

        <div 
          style={{
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row', 
            justifyContent: isMobile ? 'center' : 'space-between',
          }}
        >
          <TaskStatus 
            completed={pendingApprovalTasks} 
            inProgress={ongoingTasks} 
            pendingApproval={0} 
          />
          {loading ? <p>Loading tasks...</p> : <TaskTable tasks={tasks} onStartTask={handleStartTask} />}
        </div>
      </div>

      {/* Add custom scrollbar CSS directly in the component */}
      <style jsx>{`
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
      `}</style>
    </div>
  </>
);

};

export default DashUI;
