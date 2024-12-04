import React, { useState } from 'react';
import TaskTable from '../components/TaskTable';
import UserTopLayer from '../components/UserTopLayer';
import { FaUserCircle, FaLock, FaQuestionCircle, FaSignOutAlt,FaTasks} from 'react-icons/fa';

const Task = () => {
  const tasks = {
    'Available Tasks': [
      { id: 1, creator: 'User A', avatar: 'https://backend.dotasks.in/public/uploads/profile/user.png', name: 'Task 1', price: '₹100', dueDate: '2024-12-10' },
      { id: 2, creator: 'User B', avatar: 'https://backend.dotasks.in/public/uploads/profile/user.png', name: 'Task 2', price: '₹200', dueDate: '2024-12-11' },
      { id: 1, creator: 'User A', avatar: 'https://backend.dotasks.in/public/uploads/profile/user.png', name: 'Task 1', price: '₹100', dueDate: '2024-12-10' },
      { id: 2, creator: 'User B', avatar: 'https://backend.dotasks.in/public/uploads/profile/user.png', name: 'Task 2', price: '₹200', dueDate: '2024-12-11' },
      { id: 1, creator: 'User A', avatar: 'https://backend.dotasks.in/public/uploads/profile/user.png', name: 'Task 1', price: '₹100', dueDate: '2024-12-10' },
      { id: 1, creator: 'User A', avatar: 'https://backend.dotasks.in/public/uploads/profile/user.png', name: 'Task 1', price: '₹100', dueDate: '2024-12-10' },
      { id: 2, creator: 'User B', avatar: 'https://backend.dotasks.in/public/uploads/profile/user.png', name: 'Task 2', price: '₹200', dueDate: '2024-12-11' },
      { id: 1, creator: 'User A', avatar: 'https://backend.dotasks.in/public/uploads/profile/user.png', name: 'Task 1', price: '₹100', dueDate: '2024-12-10' },
      { id: 2, creator: 'User B', avatar: 'https://backend.dotasks.in/public/uploads/profile/user.png', name: 'Task 2', price: '₹200', dueDate: '2024-12-11' },
      { id: 1, creator: 'User A', avatar: 'https://backend.dotasks.in/public/uploads/profile/user.png', name: 'Task 1', price: '₹100', dueDate: '2024-12-10' },
      { id: 1, creator: 'User A', avatar: 'https://backend.dotasks.in/public/uploads/profile/user.png', name: 'Task 1', price: '₹100', dueDate: '2024-12-10' },
      { id: 2, creator: 'User B', avatar: 'https://backend.dotasks.in/public/uploads/profile/user.png', name: 'Task 2', price: '₹200', dueDate: '2024-12-11' },
      { id: 1, creator: 'User A', avatar: 'https://backend.dotasks.in/public/uploads/profile/user.png', name: 'Task 1', price: '₹100', dueDate: '2024-12-10' },
      { id: 2, creator: 'User B', avatar: 'https://backend.dotasks.in/public/uploads/profile/user.png', name: 'Task 2', price: '₹200', dueDate: '2024-12-11' },
      { id: 1, creator: 'User A', avatar: 'https://backend.dotasks.in/public/uploads/profile/user.png', name: 'Task 1', price: '₹100', dueDate: '2024-12-10' },
      
    
      
    ],
    'Recommended Tasks': [
      { id: 3, creator: 'User C', avatar: 'https://backend.dotasks.in/public/uploads/profile/user.png', name: 'Task 3', price: '₹150', dueDate: '2024-12-12' },
      { id: 4, creator: 'User D', avatar: 'https://backend.dotasks.in/public/uploads/profile/user.png', name: 'Task 4', price: '₹250', dueDate: '2024-12-13' },
    ],
    // Add other task categories similarly...
  };

  const [activeTab, setActiveTab] = useState('Available Tasks');

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
      <TaskTable tasks={tasks[activeTab]} />
    </div>
    </>
  );
};

export default Task;
