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
    // Query to fetch user data based on UID
    const usersQuery = query(collection(db, 'users'), where('UID', '==', UID));
    const usersSnapshot = await getDocs(usersQuery);

    if (!usersSnapshot.empty) {
      const userDoc = usersSnapshot.docs[0];
      const userTasksQuery = collection(db, 'users', userDoc.id, 'task');
      const userTasksSnapshot = await getDocs(userTasksQuery);

      // Fetch user tasks and include status
      const userTasks = userTasksSnapshot.docs.map(doc => ({
        id: doc.id,
        status: doc.data().status || 'Not Available',
        name: doc.data().name || 'Unnamed Task',
      }));

      console.log('User Tasks:', userTasks);  // Log user tasks array

      // Fetch additional task info for userTasks
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
              status: task.status, // Include the status from userTasks
            };
          }
          return null;
        })
      );

      const filteredTaskDetails = taskDetails.filter(Boolean);

      console.log('Filtered Task Details:', filteredTaskDetails);  // Log filtered task details array

      // Separate tasks by status
      const ongoingTasks = filteredTaskDetails.filter(task => task.status === 'ongoing');
      const completedTasks = filteredTaskDetails.filter(task => task.status === 'completed');

      // Fetch all tasks not in user tasks
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

      console.log('All Tasks:', allTasks);  // Log all tasks array

      // Update local storage
      localStorage.setItem('userTaskInfo', JSON.stringify(filteredTaskDetails));
      localStorage.setItem('allTasks', JSON.stringify(allTasks));

      // Prepare tasks object for state update
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

  const UID = localStorage.getItem('User-UID'); // Replace with dynamic UID

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);

        // Query to fetch user data based on UID
        const usersQuery = query(collection(db, 'users'), where('UID', '==', UID));
        const usersSnapshot = await getDocs(usersQuery);

        if (!usersSnapshot.empty) {
          const userDoc = usersSnapshot.docs[0];
          const userTasksQuery = collection(db, 'users', userDoc.id, 'task');
          const userTasksSnapshot = await getDocs(userTasksQuery);

          // Fetch user tasks and include status
          const userTasks = userTasksSnapshot.docs.map(doc => ({
            id: doc.id,
            status: doc.data().status || 'Not Available',
            name: doc.data().name || 'Unnamed Task',
          }));

          console.log('User Tasks:', userTasks);  // Log user tasks array

          const ongoingCount = userTasks.filter(task => task.status === 'ongoing').length;
          const completedCount = userTasks.filter(task => task.status === 'completed').length;

          // Fetch additional task info for userTasks
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
                  status: task.status, // Include the status from userTasks
                };
              }
              return null;
            })
          );

          const filteredTaskDetails = taskDetails.filter(Boolean);

          console.log('Filtered Task Details:', filteredTaskDetails);  // Log filtered task details array

          setUserTaskInfo(filteredTaskDetails);

          // Query to fetch all tasks not in userTasks
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

          console.log('All Tasks:', allTasks);  // Log all tasks array

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
      // Reference to the specific task document
      const taskRef = doc(db, 'tasks', taskId);
      
      // Reference to the participants subcollection
      const participantsCollectionRef = collection(taskRef, 'participants');

      // Create a new document in the participants subcollection with UID as document ID
      await setDoc(doc(participantsCollectionRef, UID), {
        createdAt: serverTimestamp(),
        status: 'ongoing'
      });

      // Query users collection to find the document with matching UID
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('UID', '==', UID));
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        // Get the first matching document (should be unique)
        const userDoc = querySnapshot.docs[0];
        
        // Reference to the task subcollection of the user document
        const userTasksCollectionRef = collection(userDoc.ref, 'task');
        
        // Add a new document to the task subcollection with taskId as document ID
        await setDoc(doc(userTasksCollectionRef, taskId), {
          createdAt: serverTimestamp(),
          status: 'ongoing'
        });
      }

      console.log(`Started Task with ID: ${taskId} for User ID: ${UID}`);
      alert(`Task started!\nUser ID: ${UID}\nTask ID: ${taskId}`);

      // Use the utility function to update local storage and refresh tasks
      const updatedTasks = await updateTasksInLocalStorage(UID);
      setTasks(updatedTasks);

      // Recalculate task counts
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

  return (
    <>
      <TopLayer />
      <div style={{ fontFamily: 'DMM, sans-serif', padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <StatBox icon={<FaTasks size="2em" />} title="Total Tasks" value={totalTasks} color="#edf0ff" />
          <StatBox icon={<FaSpinner size="2em" />} title="Ongoing Tasks" value={ongoingTasks} color="#ffe8ef" />
          <StatBox icon={<FaRegClock size="2em" />} title="Pending Approval" value={pendingApprovalTasks} color="#fcd4c8" />
          <StatBox icon={<FaRupeeSign size="2em" />} title="My Earnings" value="₹15,000" color="#fff3d4" />
        </div>
        <div
          style={{
            backgroundColor: '#E8F5E9',
            padding: '10px',
            borderRadius: '10px',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <FaBell style={{ marginRight: '10px', color: '#a30b4d' }} />
          <p style={{ margin: '0', flexGrow: '1' }}>
            You need to update your KYC, profile, social media links, and UPI; only then you'll be able to make withdraw requests.
          </p>
          <FaTimes style={{ cursor: 'pointer' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TaskStatus 
            completed={pendingApprovalTasks} 
            inProgress={ongoingTasks} 
            pendingApproval={0} 
          />
          {loading ? <p>Loading tasks...</p> : <TaskTable tasks={tasks} onStartTask={handleStartTask} />}
        </div>
      </div>
    </>
  );
};

export default DashUI;
