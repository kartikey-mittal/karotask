import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { FaTasks, FaSpinner, FaRegClock, FaRupeeSign, FaTachometerAlt } from 'react-icons/fa';

import AdminTopLayer from '../components/AdminTopLayer';
import StatsBox from '../../components/StatsBox';
import TaskStatus from '../../components/TaskStatus';
import Loading from '../../components/Loading'; // Import the Loading component

const AdminDashUI = () => {
  // States for stats
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalCreators, setTotalCreators] = useState(0);
  const [totalTasks, setTotalTasks] = useState(0);
  const [currentSubmissions, setCurrentSubmissions] = useState(0);

  // States for task status counts
  const [ongoingTasks, setOngoingTasks] = useState(0);
  const [underReviewTasks, setUnderReviewTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [pendingTasks, setPendingTasks] = useState(0);

  // State for loading
  const [loading, setLoading] = useState(true);

  // Fetch data from Firestore
  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Fetch total users
        const usersSnapshot = await getDocs(collection(db, 'users'));
        setTotalUsers(usersSnapshot.size);

        // Fetch total creators
        const creatorsSnapshot = await getDocs(collection(db, 'creators'));
        setTotalCreators(creatorsSnapshot.size);

        // Fetch total tasks and calculate task-related stats
        const tasksSnapshot = await getDocs(collection(db, 'tasks'));
        let currentSubmissionsSum = 0;
        let ongoingCount = 0;
        let underReviewCount = 0;
        let completedCount = 0;
        let pendingCount = 0;

        tasksSnapshot.forEach((doc) => {
          const taskData = doc.data();

          // Sum currentSubmissions
          if (taskData.currentSubmission) {
            currentSubmissionsSum += taskData.currentSubmission;
          }

          // Count tasks based on status
          switch (taskData.status) {
            case 'ongoing':
              ongoingCount++;
              break;
            case 'under-review':
              underReviewCount++;
              break;
            case 'completed':
              completedCount++;
              break;
            case 'pending':
              pendingCount++;
              break;
            default:
              break;
          }
        });

        setTotalTasks(tasksSnapshot.size);
        setCurrentSubmissions(currentSubmissionsSum);
        setOngoingTasks(ongoingCount);
        setUnderReviewTasks(underReviewCount);
        setCompletedTasks(completedCount);
        setPendingTasks(pendingCount);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchStats();
  }, []);

  const stats = [
    { icon: <FaTasks size="2em" />, title: 'Total Users', value: totalUsers, color: '#edf0ff' },
    { icon: <FaSpinner size="2em" />, title: 'Total Creators', value: totalCreators, color: '#ffe8ef' },
    { icon: <FaRegClock size="2em" />, title: 'Total Tasks', value: totalTasks, color: '#fcd4c8' },
    { icon: <FaRupeeSign size="2em" />, title: 'Current Submissions', value: `${currentSubmissions}`, color: '#fff3d4' },
  ];

  const Taskstats = [
    { icon: <FaTasks size="2em" />, title: 'Ongoing Tasks', value: ongoingTasks, color: '#edf0ff' },
    { icon: <FaSpinner size="2em" />, title: 'Under-Review Tasks', value: underReviewTasks, color: '#ffe8ef' },
    { icon: <FaRegClock size="2em" />, title: 'Completed Tasks', value: completedTasks, color: '#fcd4c8' },
    { icon: <FaRupeeSign size="2em" />, title: 'Pending Tasks', value: pendingTasks, color: '#fff3d4' },
  ];

  if (loading) {
    return <Loading />; // Show Loading component while data is being fetched
  }

  return (
    <>
     <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 10, backgroundColor: '#fff' }}>
      <AdminTopLayer name="Admin Dashboard" icon={FaTachometerAlt} /></div>
      <div
        style={{
          marginTop: '40px',
          height: 'calc(100vh - 60px)',
          overflowY: 'auto',
          padding: '20px',
          fontFamily: 'DMM, sans-serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginBottom: '0px',
          }}
        >
          {stats.map((stat, index) => (
            <StatsBox key={index} icon={stat.icon} title={stat.title} value={stat.value} color={stat.color} />
          ))}
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            marginBottom: '20px',
          }}
        >
          {Taskstats.map((stat, index) => (
            <StatsBox key={index} icon={stat.icon} title={stat.title} value={stat.value} color={stat.color} />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <TaskStatus
            completed={completedTasks}
            inProgress={ongoingTasks}
            pendingApproval={underReviewTasks}
            role="admin"
          />
        </div>
      </div>
    </>
  );
};

export default AdminDashUI;
