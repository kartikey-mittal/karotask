import React, { useState, useEffect } from 'react';
import StatsBox from '../../components/StatsBox';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { FaTasks, FaSpinner, FaRegClock, FaRupeeSign, FaBan, FaBell, FaTimes, FaTachometerAlt } from 'react-icons/fa';
// import Loading from "../../components/Loading";
import CreatorTopLayer from '../components/CreatorTopLayer';
import LatestTask from '../../components/LatestTask';
import TaskStatus from '../../components/TaskStatus';

const CreatorDashUI = () => {
  const UID = localStorage.getItem('Creator-UID');
    const [screenWidth, setScreenWidth] = useState(window.innerWidth); 
  const [loading, setLoading] = useState(true); // New loading state
  const [creatorOngoingTasks, setCreatorOngoingTasks] = useState([]);
  const [creatorCompletedTasks, setCreatorCompletedTasks] = useState([]);
  const [creatorPendingTasks, setCreatorPendingTasks] = useState([]);
  const [creatorRejectedTasksCount, setCreatorRejectedTasksCount] = useState(0);
  const [latestTasks, setLatestTasks] = useState([]);

  // Function to format Firestore Timestamp
  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate(); // Convert Firestore Timestamp to JavaScript Date
    return date.toLocaleDateString(); // Format date as string
  };

  // Function to check if a task is unexpired
  const isTaskUnexpired = (dueDate) => {
    if (!dueDate) return false;
    const currentDate = new Date();
    const taskDueDate = dueDate.toDate();
    return taskDueDate >= currentDate;
  };

  useEffect(() => {
      const handleResize = () => setScreenWidth(window.innerWidth);
  
      window.addEventListener('resize', handleResize);
  
      return () => window.removeEventListener('resize', handleResize);
    }, []);
    const isMobile = screenWidth <= 768;
  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const tasksRef = collection(db, 'tasks');
        
        // Query for tasks where creatorID is 'SRM' and due date has not expired
        const tasksQuery = query(
          tasksRef, 
          where('creatorID', '==', UID),
          where('dueDate', '>=', new Date()) // Only get tasks with future or current due dates
        );

        const querySnapshot = await getDocs(tasksQuery);

        let ongoingTasks = [];
        let completedTasks = [];
        let pendingTasks = [];
        let rejectedTasksCount = 0;
        let latestTasksData = [];

        querySnapshot.forEach((doc) => {
          const taskData = doc.data();
          const formattedTask = {
            id: doc.id, // Add document ID for unique key
            title: taskData.name,
            price: taskData.price,
            dueDate: formatDate(taskData.dueDate), 
            status: taskData.status,
            originalDueDate: taskData.dueDate // Keep original timestamp for potential further use
          };

          // Only process tasks that are not expired
          if (isTaskUnexpired(taskData.dueDate)) {
            if (taskData.status === 'ongoing') {
              ongoingTasks.push(formattedTask);
            } else if (taskData.status === 'completed') {
              completedTasks.push(formattedTask);
            } else if (taskData.status === 'under-review') {
              pendingTasks.push(formattedTask);
            }

            // Add to latest tasks, limited to 6
            if (latestTasksData.length < 6) {
              latestTasksData.push(formattedTask);
            }
          }

          // Count rejected tasks (can be outside the unexpired check)
          if (taskData.status === 'rejected') {
            rejectedTasksCount += 1;
          }
        });

        setCreatorOngoingTasks(ongoingTasks);
        console.log(creatorOngoingTasks)
        setCreatorCompletedTasks(completedTasks);
        setCreatorPendingTasks(pendingTasks);
        setCreatorRejectedTasksCount(rejectedTasksCount);
        setLatestTasks(latestTasksData);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false); // Hide loading popup
      }
    };

    fetchTasks();
  }, []);

  // if (loading) {
  //   return <Loading />; // Show loading component
  // }
  const TopLayer = () => {
    return <CreatorTopLayer name="Dashboard" icon={FaTasks} />;
  };

  const stats = [
    { 
      icon: <FaTasks size="2em" />, 
      title: 'Total Tasks', 
      value: creatorOngoingTasks.length + creatorCompletedTasks.length + creatorPendingTasks.length, 
      color: '#edf0ff' 
    },
    { 
      icon: <FaSpinner size="2em" />, 
      title: 'Ongoing Tasks', 
      value: creatorOngoingTasks.length, 
      color: '#ffe8ef' 
    },
    { 
      icon: <FaRegClock size="2em" />, 
      title: 'Pending Approval', 
      value: creatorPendingTasks.length, 
      color: '#fcd4c8' 
    },
    { 
      icon: <FaRupeeSign size="2em" />, 
      title: 'My Spending', 
      value: '₹0', 
      color: '#fff3d4' 
    },
    { 
      icon: <FaBan size="2em" />, 
      title: 'Rejected Tasks', 
      value: creatorRejectedTasksCount, 
      color: '#fbeaea' 
    },
  ];

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
      <CreatorTopLayer name="Creator Dashboard" icon={FaTachometerAlt} /></div>
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
            flexWrap: isMobile ? 'nowrap' : 'wrap',
            overflowX: 'hidden'
          }}
        >
          {stats.map((stat, index) => (
            <StatsBox key={index} icon={stat.icon} title={stat.title} value={stat.value} color={stat.color} />
          ))}
        </div>
        <div style={{ backgroundColor: '#E8F5E9', padding: '10px', borderRadius: '10px', marginBottom: '20px', display: 'flex', alignItems: 'center' ,textAlign: isMobile ? 'center' : 'left',}}>
          <FaBell style={{ marginRight: '10px', color: '#a30b4d' }} />
          <p style={{ margin: '0', flexGrow: '1' }}>You're a Creator</p>
          <FaTimes style={{ cursor: 'pointer' }} />
        </div>
        <div 
          style={{
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row', 
            justifyContent: isMobile ? 'center' : 'space-between',
          }}
        >
          <TaskStatus 
            completed={creatorCompletedTasks.length} 
            inProgress={creatorOngoingTasks.length} 
            pendingApproval={creatorPendingTasks.length} 
            role="creator" 
          />
          {/* <div>{latestTasks.length}</div> */}
        
    <LatestTask tasks={latestTasks} role="creator" />
  
        </div>
      </div>
      </div>
    </>
  );
};

export default CreatorDashUI;