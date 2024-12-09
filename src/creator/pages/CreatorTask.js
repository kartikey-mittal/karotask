import React, { useState } from 'react';
import CreatorTopLayer from '../components/CreatorTopLayer';
import { FaTasks, FaPlusSquare } from 'react-icons/fa';
import CreatorTaskCard from '../components/CreatorTaskCard';
import { NavLink } from 'react-router-dom';

const CreatorTask = () => {
  const tasks = {
    'All Tasks': [
      {
        id: 1,
        title: 'Task 1',
        date: '4 days ago',
        status: 'Pending',
        price: 10.0,
        dueDate: '2024-12-11',
        description: 'Call 50 Students & take feedback.',
        tags: ['Intermediate', 'Data Entry'],
      },
    ],
    'Ongoing Tasks': [
      {
        id: 2,
        title: 'Task 2',
        date: '2 days ago',
        status: 'Completed',
        price: 15.0,
        dueDate: '2024-12-15',
        description: 'Prepare a survey report.',
        tags: ['Advanced', 'Research'],
      },
    ],
  };

  const [activeTab, setActiveTab] = useState('All Tasks');

  return (
    <>
      <CreatorTopLayer name="Tasks" icon={FaTasks} />
      <div style={{ padding: '20px', fontFamily: 'DMM, sans-serif' }}>
        {/* Full-width div with button */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '10px',
            width: '100%',
          }}
        >
          <span
            style={{
              margin: '0',
              fontWeight: 'bold',
              fontSize: '1rem',
            }}
          ></span>
          <button
            style={{
              backgroundColor: '#d9418d',
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
    color: 'inherit', // Ensures the text color from button is applied
    textDecoration: 'none', // Prevent default underline from NavLink
  }}
>
  Create a New Task <FaPlusSquare style={{ marginLeft: '8px' }} />
</NavLink>

          </button>
        </div>

        {/* Tabs */}
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

        {/* Task Cards */}
        {tasks[activeTab]?.map((task) => (
          <CreatorTaskCard key={task.id} {...task} />
        ))}
      </div>
    </>
  );
};

export default CreatorTask;
