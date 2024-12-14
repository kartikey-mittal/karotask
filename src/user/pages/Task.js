import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { 
  doc, 
  setDoc, 
  collection, 
  serverTimestamp, 
  query, 
  where, 
  getDocs 
} from 'firebase/firestore';
import TaskTable from '../components/TaskTable';
import UserTopLayer from '../components/UserTopLayer';
import { FaTasks } from 'react-icons/fa';

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
        'Available Tasks': Array.isArray(allTasks) ? allTasks : [],
        'Ongoing Tasks': Array.isArray(ongoingTasks) ? ongoingTasks : [],
        'Completed Tasks': Array.isArray(completedTasks) ? completedTasks : [],
      };
      
    }

    
  } catch (error) {
    console.error('Error updating tasks in local storage:', error);
    return {
      'Available Tasks': [],
      'Ongoing Tasks': [],
      'Completed Tasks': [],
    };
  }
};

const Task = () => {
  const [tasks, setTasks] = useState({
    'Available Tasks': [],
    'Ongoing Tasks': [],
    'Completed Tasks': [],
  });
  const [activeTab, setActiveTab] = useState('Available Tasks');
  const UID = localStorage.getItem('User-UID');// Replace with dynamic UID logic if needed

  useEffect(() => {
    const fetchTasks = async () => {
      const updatedTasks = await updateTasksInLocalStorage(UID);
      setTasks(updatedTasks);
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

    } catch (error) {
      console.error('Error starting task:', error);
      alert('Failed to start task. Please try again.');
    }
  };

  

  return (
    <>
      <UserTopLayer name="Tasks" icon={FaTasks} />
      <div style={{ padding: '20px', fontFamily: 'DMM, sans-serif' }}>
        <div className="tabs" style={{ display: 'flex', borderBottom: '2px solid #ddd' }}>
          {Object.keys(tasks).map((tab) => (
            <div
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '10px 20px',
                cursor: 'pointer',
                fontWeight: activeTab === tab ? 'bold' : 'normal',
                color: activeTab === tab ? '#ff4081' : '#858585',
                borderBottom: activeTab === tab ? '2px solid #ff4081' : 'none',
              }}
            >
              {tab}
            </div>
          ))}
        </div>
                          {Array.isArray(tasks[activeTab]) ? (
                    <TaskTable tasks={tasks[activeTab]} onStartTask={handleStartTask} />
                  ) : (
                    <p>No tasks available for this category.</p>
                  )}

      </div>
    </>
  );
};

export default Task;