import React, { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase'; // Importing the shared Firestore instance
import CreatorTopLayer from '../components/CreatorTopLayer';
import { FaTasks, FaPlusSquare } from 'react-icons/fa';
import CreatorTaskCard from '../components/CreatorTaskCard';
import { NavLink } from 'react-router-dom';

const CreatorTask = () => {
  const [tasks, setTasks] = useState({ 'All Tasks': [], 'Ongoing Tasks': [] });
  const [activeTab, setActiveTab] = useState('All Tasks');


  const [activeTab, setActiveTab] = useState('All Tasks');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasksCollection = collection(db, 'tasks');
        const tasksQuery = query(tasksCollection, where('creatorID', '==', 'SRM'));
        const querySnapshot = await getDocs(tasksQuery);

        const allTasks = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.name,
            date: formatRelativeDate(data.createdAt),
            status: data.status,
            price: data.price,
            dueDate: formatDate(data.dueDate),
            description: data.overview,
            tags: [data.category],
            maxSubmission: data.maxSubmission,
          };
        });

        const ongoingTasks = allTasks.filter((task) => task.status === 'ongoing');
        const completedTasks = allTasks.filter((task) => task.status === 'completed');
        const pendingTasks = allTasks.filter((task) => task.status === 'pending');

        setTasks({
          'All Tasks': allTasks,
          'Ongoing Tasks': ongoingTasks,
          'Completed Tasks': completedTasks,
          'Pending Tasks': pendingTasks,
        });
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    const formatRelativeDate = (timestamp) => {
      if (!timestamp) return 'Unknown date';
      const date = timestamp.toDate();
      const now = new Date();
      const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
      return `${diffInDays} days ago`;
    };

    const formatDate = (timestamp) => {
      if (!timestamp) return 'No due date';
      const date = timestamp.toDate();
      return date.toLocaleDateString();
    };

    fetchTasks();
  }, []);


  return (
    <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden',
      fontFamily: 'DMM, sans-serif',
    }}
  >
    {/* CreatorTopLayer remains fixed */}
    <div
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backgroundColor: '#fff',
      }}
    >
      <CreatorTopLayer name="Tasks" icon={FaTasks} />
    </div>
  
    <div
      style={{
        flex: '1',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px',
        overflow: 'hidden', // Ensures no extra scroll outside task cards
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '10px',
          width: '100%',
        }}
      >
        <button
          style={{
            backgroundColor: '#2f2f2f',
            color: '#FFF',
            padding: '10px 10px',
            border: 'none',
            borderRadius: '10px',
            cursor: 'pointer',
            fontFamily: 'DMM',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <NavLink
            to={`create-task`}
            style={{
              display: 'flex',
              alignItems: 'center',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Create a New Task <FaPlusSquare style={{ marginLeft: '8px' }} />
          </NavLink>
        </button>
      </div>
  
      <div
        className="tabs"
        style={{ display: 'flex', borderBottom: '2px solid #ddd', marginBottom: '10px' }}
      >
        {Object.keys(tasks).map((tab) => (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{

              backgroundColor: '#d9418d',
              color: '#FFF',
              padding: '10px 10px',
              border: 'none',
              borderRadius: '10px',

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
  
      {/* Task cards container */}
      <div
        style={{
          flex: '1',
          overflowY: 'auto',
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '10px',overflowX: 'hidden'
        }}
      >
        {tasks[activeTab]?.map((task) => (
          <CreatorTaskCard key={task.id} {...task} />
        ))}
      </div>
    </div>
  </div>
  
  );
};

export default CreatorTask;
